"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var user_controller_1 = require("../controllers/user.controller");
var resourceValidator_1 = __importDefault(require("../middlewares/resourceValidator"));
var user_schema_1 = require("../schemas/user.schema");
var auth_middleware_1 = require("../middlewares/auth.middleware");
var UserRouter = express_1.default.Router();
UserRouter.route('/').get(user_controller_1.getAllUsers);
UserRouter.route('/singup').post((0, resourceValidator_1.default)(user_schema_1.CreateUserSchema), user_controller_1.userSignup);
UserRouter.route('/activate').post((0, resourceValidator_1.default)(user_schema_1.ActivateUserSchema), user_controller_1.activateAccount);
UserRouter.route('/login').post((0, resourceValidator_1.default)(user_schema_1.UserLoginSchema), user_controller_1.userLogin);
UserRouter.route('/change-password').post((0, resourceValidator_1.default)(user_schema_1.ChangePasswordSchema), auth_middleware_1.protect, user_controller_1.changeUserPassword);
UserRouter.route('/forgot-password').post((0, resourceValidator_1.default)(user_schema_1.ForgotPasswordSchema), user_controller_1.userForgotPassword);
UserRouter.route('/reset-password').post((0, resourceValidator_1.default)(user_schema_1.ResetPasswordSchema), user_controller_1.resetUserPassword);
exports.default = UserRouter;
