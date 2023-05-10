"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetPasswordSchema = exports.ForgotPasswordSchema = exports.ChangePasswordSchema = exports.UserLoginSchema = exports.ActivateUserSchema = exports.UserSchema = exports.CreateUserSchema = void 0;
var zod_1 = require("zod");
var CreateUserDTO = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string(),
});
var User = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string(),
    isActive: zod_1.z.boolean().default(false),
    otp: zod_1.z.number(),
    resetToken: zod_1.z.string(),
});
var ActivateUserDTO = zod_1.z.object({
    otp: zod_1.z.string(),
    email: zod_1.z.string().email(),
});
var UserLoginDTO = zod_1.z.object({
    password: zod_1.z.string(),
    email: zod_1.z.string().email(),
});
var ChangePasswordDTO = zod_1.z.object({
    oldPassword: zod_1.z.string(),
    newPassword: zod_1.z.string(),
});
var ForgotPasswordDTO = zod_1.z.object({
    email: zod_1.z.string(),
});
var ResetPasswordDTO = zod_1.z.object({
    email: zod_1.z.string(),
    resetToken: zod_1.z.string(),
    password: zod_1.z.string(),
});
exports.CreateUserSchema = zod_1.z.object({
    body: CreateUserDTO,
});
exports.UserSchema = zod_1.z.object({
    body: User,
});
exports.ActivateUserSchema = zod_1.z.object({
    body: ActivateUserDTO,
});
exports.UserLoginSchema = zod_1.z.object({
    body: UserLoginDTO,
});
exports.ChangePasswordSchema = zod_1.z.object({
    body: ChangePasswordDTO,
});
exports.ForgotPasswordSchema = zod_1.z.object({
    body: ForgotPasswordDTO,
});
exports.ResetPasswordSchema = zod_1.z.object({
    body: ResetPasswordDTO,
});
