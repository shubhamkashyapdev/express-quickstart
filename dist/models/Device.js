"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var schema = new mongoose_1.default.Schema({
    deviceId: {
        type: String,
        required: [true, 'Device ID is required'],
    },
    deviceType: {
        type: String,
        required: [true, 'Type is required'],
    },
});
var DeviceModel = mongoose_1.default.model('device', schema);
exports.default = DeviceModel;
