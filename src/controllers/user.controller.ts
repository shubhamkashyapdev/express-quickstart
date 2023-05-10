import { NextFunction, Request, Response } from 'express'
import UserModel from '../models/User'
import { socket } from '../index'
import { handleError } from '../utils/error-handler'
import { resGeneric } from '../utils/res-generic'
import {
  ChangePasswordType,
  CreateUserType,
  ForgotPasswordType,
  LoginUserType,
  ResetPasswordType,
} from '../schemas/user.schema'
import { generateOTP } from '../utils/helper'
import { sendEmail, sendForgotPasswordEmail } from '../utils/send-email'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config/credentials'
import { v4 as uuid } from 'uuid'

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find({})
      .select('-password -otp -resetToken')
      .lean()
    const response = resGeneric({
      data: users,
      message: 'All Users',
      status: 'SUCCESS',
    })

    res.status(200).json(response)
  } catch (err) {
    handleError({ err, res })
  }
}

export const userSignup = async (req: Request, res: Response) => {
  try {
    const body = req.body as CreateUserType
    // check if user already exists
    const userExists = await UserModel.findOne({ email: body.email })
    if (userExists) {
      const response = resGeneric({
        message: 'User already exists',
        status: 'FAILURE',
      })
      return res.status(400).json(response)
    }

    // hash password
    const hashPassword = await bcrypt.hash(body.password, 10)
    body.password = hashPassword

    // Store In Redis
    const otp = generateOTP()

    const newUser = await UserModel.create({ ...body, otp })
    socket.emit('new-user', `${newUser.email} account created`)

    // Send Email OTP
    await sendEmail({ otp, to_email: body.email })

    const response = resGeneric({
      message: 'User created successfully',
      status: 'SUCCESS',
      data: `${newUser.email} account created`,
    })
    res.status(200).json(response)
  } catch (err) {
    handleError({ err, res })
  }
}

export const activateAccount = async (req: Request, res: Response) => {
  try {
    const otp = `${req.body.otp}`
    const email = req.body.email
    // check if account does not exist
    const account = await UserModel.findOne({ email })
    if (!account) {
      const response = resGeneric({
        message: 'User account not found',
        status: 'FAILURE',
      })
      return res.status(404).json(response)
    }
    // check if account is already activated
    if (account.isActive) {
      const response = resGeneric({
        message: 'Account is already active',
        status: 'FAILURE',
      })
      return res.status(400).json(response)
    }
    // check if otp is valid
    if (otp !== `${account.otp}`) {
      const response = resGeneric({ message: 'INVALID OTP', status: 'FAILURE' })
      return res.status(400).json(response)
    }
    account.isActive = true
    await account.save()
    const response = resGeneric({
      message: 'Account Activated',
      status: 'SUCCESS',
    })
    return res.status(200).json(response)
  } catch (err) {
    handleError({ err, res })
  }
}

export const userLogin = async (req: Request, res: Response) => {
  try {
    const body = req.body as LoginUserType
    // check if user exists
    const userExists = await UserModel.findOne({ email: body.email })
    if (!userExists) {
      const response = resGeneric({
        message: 'User account not found',
        status: 'FAILURE',
      })
      return res.status(404).json(response)
    }

    // check if account is active
    if (!userExists.isActive) {
      const response = resGeneric({
        message: 'Please activate your account',
        status: 'FAILURE',
      })
      return res.status(400).json(response)
    }

    // check if password is correct
    const match = await bcrypt.compare(body.password, userExists.password)
    if (!match) {
      const response = resGeneric({
        message: 'Invalid Password Or Email',
        status: 'FAILURE',
      })
      return res.status(400).json(response)
    }
    // generate token
    const jwt_payload = {
      id: userExists.id,
    }
    const token = jwt.sign(jwt_payload, JWT_SECRET)
    const response = resGeneric({
      message: 'Login Successfull',
      status: 'SUCCESS',
      data: token,
    })
    return res.status(200).json(response)
  } catch (err) {
    handleError({ err, res })
  }
}

export const changeUserPassword = async (req: Request, res: Response) => {
  try {
    const body = req.body as ChangePasswordType
    const user = req.user
    const userExists = await UserModel.findById(user)
    if (!userExists) {
      const response = resGeneric({
        message: 'User not found',
        status: 'FAILURE',
      })
      return res.status(404).json(response)
    }
    // check if password is correct
    const match = await bcrypt.compare(body.oldPassword, userExists.password)
    if (!match) {
      const response = resGeneric({
        message: 'Invalid Password',
        status: 'FAILURE',
      })
      return res.status(400).json(response)
    }
    // create new password hash
    const hashPassword = await bcrypt.hash(body.newPassword, 10)
    userExists.password = hashPassword
    await userExists.save()
    const response = resGeneric({
      message: `${userExists.email} password has successfully been updated`,
      status: 'SUCCESS',
    })
    return res.status(200).json(response)
  } catch (err) {
    handleError({ err, res })
  }
}

export const userForgotPassword = async (req: Request, res: Response) => {
  try {
    const body = req.body as ForgotPasswordType
    const userExists = await UserModel.findOne({ email: body.email })
    if (!userExists) {
      const response = resGeneric({
        message: 'User not found',
        status: 'FAILURE',
      })
      return res.status(404).json(response)
    }
    // generate unique token and (@todo - store in redis)
    const token = uuid()

    // send password reset email - reset token
    await sendForgotPasswordEmail({ to_email: body.email, token })

    userExists.resetToken = token
    await userExists.save()
    const response = resGeneric({
      message: 'Password reset token sent to email address',
      status: 'SUCCESS',
    })
    res.status(200).json(response)
  } catch (err) {
    handleError({ err, res })
  }
}
export const resetUserPassword = async (req: Request, res: Response) => {
  try {
    const body = req.body as ResetPasswordType
    const userExists = await UserModel.findOne({ email: body.email })
    if (!userExists) {
      const response = resGeneric({
        message: 'User not found',
        status: 'FAILURE',
      })
      return res.status(404).json(response)
    }
    // check if token is valid
    if (body.resetToken !== userExists.resetToken) {
      const response = resGeneric({
        message: 'Invalid reset password token',
        status: 'FAILURE',
      })
      return res.status(400).json(response)
    }
    // set new hash password
    const hashPassword = await bcrypt.hash(body.password, 10)
    userExists.password = hashPassword
    await userExists.save()
    const response = resGeneric({
      message: 'Password reset successfully',
      status: 'SUCCESS',
    })
    res.status(200).json(response)
  } catch (err) {
    handleError({ err, res })
  }
}
