"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resGeneric = void 0;
var resGeneric = function (_a) {
    var status = _a.status, message = _a.message, _b = _a.data, data = _b === void 0 ? '' : _b;
    return {
        STATUS_RESPONSE: status,
        STATUS_MESSAGE: message,
        STATUS_DATA: data,
    };
};
exports.resGeneric = resGeneric;
