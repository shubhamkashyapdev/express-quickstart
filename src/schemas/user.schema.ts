import { z } from 'zod'

const CreateUserDTO = z.object({
  email: z.string().email(),
  password: z.string(),
})

const User = z.object({
  email: z.string().email(),
  password: z.string(),
  isActive: z.boolean().default(false),
  otp: z.number(),
  resetToken: z.string(),
})

const ActivateUserDTO = z.object({
  otp: z.string(),
  email: z.string().email(),
})

const UserLoginDTO = z.object({
  password: z.string(),
  email: z.string().email(),
})

const ChangePasswordDTO = z.object({
  oldPassword: z.string(),
  newPassword: z.string(),
})

const ForgotPasswordDTO = z.object({
  email: z.string(),
})
const ResetPasswordDTO = z.object({
  email: z.string(),
  resetToken: z.string(),
  password: z.string(),
})

export const CreateUserSchema = z.object({
  body: CreateUserDTO,
})
export type CreateUserType = z.infer<typeof CreateUserDTO>

export const UserSchema = z.object({
  body: User,
})
export type UserType = z.infer<typeof User>

export const ActivateUserSchema = z.object({
  body: ActivateUserDTO,
})
export type ActivateUserType = z.infer<typeof ActivateUserDTO>

export const UserLoginSchema = z.object({
  body: UserLoginDTO,
})
export type LoginUserType = z.infer<typeof UserLoginDTO>

export const ChangePasswordSchema = z.object({
  body: ChangePasswordDTO,
})
export type ChangePasswordType = z.infer<typeof ChangePasswordDTO>

export const ForgotPasswordSchema = z.object({
  body: ForgotPasswordDTO,
})
export type ForgotPasswordType = z.infer<typeof ForgotPasswordDTO>

export const ResetPasswordSchema = z.object({
  body: ResetPasswordDTO,
})
export type ResetPasswordType = z.infer<typeof ResetPasswordDTO>
