import express from 'express'
import {
  userSignup,
  getAllUsers,
  activateAccount,
  userLogin,
  changeUserPassword,
  userForgotPassword,
  resetUserPassword,
} from '../controllers/user.controller'
import validator from '../middlewares/resourceValidator'
import {
  CreateUserSchema,
  ActivateUserSchema,
  UserLoginSchema,
  ChangePasswordSchema,
  ForgotPasswordSchema,
  ResetPasswordSchema,
} from '../schemas/user.schema'
import { protect } from '../middlewares/auth.middleware'

const UserRouter = express.Router()

UserRouter.route('/').get(getAllUsers)
UserRouter.route('/singup').post(validator(CreateUserSchema), userSignup)
UserRouter.route('/activate').post(
  validator(ActivateUserSchema),
  activateAccount
)
UserRouter.route('/login').post(validator(UserLoginSchema), userLogin)
UserRouter.route('/change-password').post(
  validator(ChangePasswordSchema),
  protect,
  changeUserPassword
)
UserRouter.route('/forgot-password').post(
  validator(ForgotPasswordSchema),
  userForgotPassword
)
UserRouter.route('/reset-password').post(
  validator(ResetPasswordSchema),
  resetUserPassword
)
export default UserRouter
