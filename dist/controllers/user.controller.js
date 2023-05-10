"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetUserPassword = exports.userForgotPassword = exports.changeUserPassword = exports.userLogin = exports.activateAccount = exports.userSignup = exports.getAllUsers = void 0;
var User_1 = __importDefault(require("../models/User"));
var index_1 = require("../index");
var error_handler_1 = require("../utils/error-handler");
var res_generic_1 = require("../utils/res-generic");
var helper_1 = require("../utils/helper");
var send_email_1 = require("../utils/send-email");
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var credentials_1 = require("../config/credentials");
var uuid_1 = require("uuid");
var getAllUsers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users, response, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, User_1.default.find({})
                        .select('-password -otp -resetToken')
                        .lean()];
            case 1:
                users = _a.sent();
                response = (0, res_generic_1.resGeneric)({
                    data: users,
                    message: 'All Users',
                    status: 'SUCCESS',
                });
                res.status(200).json(response);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                (0, error_handler_1.handleError)({ err: err_1, res: res });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllUsers = getAllUsers;
var userSignup = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var body, userExists, response_1, hashPassword, otp, newUser, response, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                body = req.body;
                return [4 /*yield*/, User_1.default.findOne({ email: body.email })];
            case 1:
                userExists = _a.sent();
                if (userExists) {
                    response_1 = (0, res_generic_1.resGeneric)({
                        message: 'User already exists',
                        status: 'FAILURE',
                    });
                    return [2 /*return*/, res.status(400).json(response_1)];
                }
                return [4 /*yield*/, bcryptjs_1.default.hash(body.password, 10)];
            case 2:
                hashPassword = _a.sent();
                body.password = hashPassword;
                otp = (0, helper_1.generateOTP)();
                return [4 /*yield*/, User_1.default.create(__assign(__assign({}, body), { otp: otp }))];
            case 3:
                newUser = _a.sent();
                index_1.socket.emit('new-user', "".concat(newUser.email, " account created"));
                // Send Email OTP
                return [4 /*yield*/, (0, send_email_1.sendEmail)({ otp: otp, to_email: body.email })];
            case 4:
                // Send Email OTP
                _a.sent();
                response = (0, res_generic_1.resGeneric)({
                    message: 'User created successfully',
                    status: 'SUCCESS',
                    data: "".concat(newUser.email, " account created"),
                });
                res.status(200).json(response);
                return [3 /*break*/, 6];
            case 5:
                err_2 = _a.sent();
                (0, error_handler_1.handleError)({ err: err_2, res: res });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.userSignup = userSignup;
var activateAccount = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var otp, email, account, response_2, response_3, response_4, response, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                otp = "".concat(req.body.otp);
                email = req.body.email;
                return [4 /*yield*/, User_1.default.findOne({ email: email })];
            case 1:
                account = _a.sent();
                if (!account) {
                    response_2 = (0, res_generic_1.resGeneric)({
                        message: 'User account not found',
                        status: 'FAILURE',
                    });
                    return [2 /*return*/, res.status(404).json(response_2)];
                }
                // check if account is already activated
                if (account.isActive) {
                    response_3 = (0, res_generic_1.resGeneric)({
                        message: 'Account is already active',
                        status: 'FAILURE',
                    });
                    return [2 /*return*/, res.status(400).json(response_3)];
                }
                // check if otp is valid
                if (otp !== "".concat(account.otp)) {
                    response_4 = (0, res_generic_1.resGeneric)({ message: 'INVALID OTP', status: 'FAILURE' });
                    return [2 /*return*/, res.status(400).json(response_4)];
                }
                account.isActive = true;
                return [4 /*yield*/, account.save()];
            case 2:
                _a.sent();
                response = (0, res_generic_1.resGeneric)({
                    message: 'Account Activated',
                    status: 'SUCCESS',
                });
                return [2 /*return*/, res.status(200).json(response)];
            case 3:
                err_3 = _a.sent();
                (0, error_handler_1.handleError)({ err: err_3, res: res });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.activateAccount = activateAccount;
var userLogin = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var body, userExists, response_5, response_6, match, response_7, jwt_payload, token, response, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                body = req.body;
                return [4 /*yield*/, User_1.default.findOne({ email: body.email })];
            case 1:
                userExists = _a.sent();
                if (!userExists) {
                    response_5 = (0, res_generic_1.resGeneric)({
                        message: 'User account not found',
                        status: 'FAILURE',
                    });
                    return [2 /*return*/, res.status(404).json(response_5)];
                }
                // check if account is active
                if (!userExists.isActive) {
                    response_6 = (0, res_generic_1.resGeneric)({
                        message: 'Please activate your account',
                        status: 'FAILURE',
                    });
                    return [2 /*return*/, res.status(400).json(response_6)];
                }
                return [4 /*yield*/, bcryptjs_1.default.compare(body.password, userExists.password)];
            case 2:
                match = _a.sent();
                if (!match) {
                    response_7 = (0, res_generic_1.resGeneric)({
                        message: 'Invalid Password Or Email',
                        status: 'FAILURE',
                    });
                    return [2 /*return*/, res.status(400).json(response_7)];
                }
                jwt_payload = {
                    id: userExists.id,
                };
                token = jsonwebtoken_1.default.sign(jwt_payload, credentials_1.JWT_SECRET);
                response = (0, res_generic_1.resGeneric)({
                    message: 'Login Successfull',
                    status: 'SUCCESS',
                    data: token,
                });
                return [2 /*return*/, res.status(200).json(response)];
            case 3:
                err_4 = _a.sent();
                (0, error_handler_1.handleError)({ err: err_4, res: res });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.userLogin = userLogin;
var changeUserPassword = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var body, user, userExists, response_8, match, response_9, hashPassword, response, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                body = req.body;
                user = req.user;
                return [4 /*yield*/, User_1.default.findById(user)];
            case 1:
                userExists = _a.sent();
                if (!userExists) {
                    response_8 = (0, res_generic_1.resGeneric)({
                        message: 'User not found',
                        status: 'FAILURE',
                    });
                    return [2 /*return*/, res.status(404).json(response_8)];
                }
                return [4 /*yield*/, bcryptjs_1.default.compare(body.oldPassword, userExists.password)];
            case 2:
                match = _a.sent();
                if (!match) {
                    response_9 = (0, res_generic_1.resGeneric)({
                        message: 'Invalid Password',
                        status: 'FAILURE',
                    });
                    return [2 /*return*/, res.status(400).json(response_9)];
                }
                return [4 /*yield*/, bcryptjs_1.default.hash(body.newPassword, 10)];
            case 3:
                hashPassword = _a.sent();
                userExists.password = hashPassword;
                return [4 /*yield*/, userExists.save()];
            case 4:
                _a.sent();
                response = (0, res_generic_1.resGeneric)({
                    message: "".concat(userExists.email, " password has successfully been updated"),
                    status: 'SUCCESS',
                });
                return [2 /*return*/, res.status(200).json(response)];
            case 5:
                err_5 = _a.sent();
                (0, error_handler_1.handleError)({ err: err_5, res: res });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.changeUserPassword = changeUserPassword;
var userForgotPassword = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var body, userExists, response_10, token, response, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                body = req.body;
                return [4 /*yield*/, User_1.default.findOne({ email: body.email })];
            case 1:
                userExists = _a.sent();
                if (!userExists) {
                    response_10 = (0, res_generic_1.resGeneric)({
                        message: 'User not found',
                        status: 'FAILURE',
                    });
                    return [2 /*return*/, res.status(404).json(response_10)];
                }
                token = (0, uuid_1.v4)();
                // send password reset email - reset token
                return [4 /*yield*/, (0, send_email_1.sendForgotPasswordEmail)({ to_email: body.email, token: token })];
            case 2:
                // send password reset email - reset token
                _a.sent();
                userExists.resetToken = token;
                return [4 /*yield*/, userExists.save()];
            case 3:
                _a.sent();
                response = (0, res_generic_1.resGeneric)({
                    message: 'Password reset token sent to email address',
                    status: 'SUCCESS',
                });
                res.status(200).json(response);
                return [3 /*break*/, 5];
            case 4:
                err_6 = _a.sent();
                (0, error_handler_1.handleError)({ err: err_6, res: res });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.userForgotPassword = userForgotPassword;
var resetUserPassword = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var body, userExists, response_11, response_12, hashPassword, response, err_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                body = req.body;
                return [4 /*yield*/, User_1.default.findOne({ email: body.email })];
            case 1:
                userExists = _a.sent();
                if (!userExists) {
                    response_11 = (0, res_generic_1.resGeneric)({
                        message: 'User not found',
                        status: 'FAILURE',
                    });
                    return [2 /*return*/, res.status(404).json(response_11)];
                }
                // check if token is valid
                if (body.resetToken !== userExists.resetToken) {
                    response_12 = (0, res_generic_1.resGeneric)({
                        message: 'Invalid reset password token',
                        status: 'FAILURE',
                    });
                    return [2 /*return*/, res.status(400).json(response_12)];
                }
                return [4 /*yield*/, bcryptjs_1.default.hash(body.password, 10)];
            case 2:
                hashPassword = _a.sent();
                userExists.password = hashPassword;
                return [4 /*yield*/, userExists.save()];
            case 3:
                _a.sent();
                response = (0, res_generic_1.resGeneric)({
                    message: 'Password reset successfully',
                    status: 'SUCCESS',
                });
                res.status(200).json(response);
                return [3 /*break*/, 5];
            case 4:
                err_7 = _a.sent();
                (0, error_handler_1.handleError)({ err: err_7, res: res });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.resetUserPassword = resetUserPassword;
