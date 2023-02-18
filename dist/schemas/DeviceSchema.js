"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var zod_1 = require("zod");
var Device = zod_1.z.object({
    deviceId: zod_1.z.number(),
    deviceType: zod_1.z.string(),
    deviceName: zod_1.z.string(),
});
var DeviceSchema = zod_1.z.object({
    body: Device,
});
exports.default = DeviceSchema;
