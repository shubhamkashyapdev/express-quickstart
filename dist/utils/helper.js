"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOTP = void 0;
var generateOTP = function () {
    var number = Math.floor(Math.random() * 100000).toString();
    return number.substring(0, 4);
};
exports.generateOTP = generateOTP;
