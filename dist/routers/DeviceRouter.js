"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var DeviceController_1 = require("../controllers/DeviceController");
var resourceValidator_1 = __importDefault(require("../middlewares/resourceValidator"));
var DeviceSchema_1 = __importDefault(require("../schemas/DeviceSchema"));
var DeviceRouter = express_1.default.Router();
DeviceRouter.route('/').get(DeviceController_1.getAllDevices);
DeviceRouter.route('/').post((0, resourceValidator_1.default)(DeviceSchema_1.default), DeviceController_1.createDevice);
exports.default = DeviceRouter;
