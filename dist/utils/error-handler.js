"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = void 0;
var handleError = function (_a) {
    var _b, _c, _d, _e;
    var err = _a.err, res = _a.res;
    console.log({ err: err });
    // MONGODB DUPLICATE KEY ERROR
    if ((err === null || err === void 0 ? void 0 : err.code) === 11000) {
        var key = Object.keys(err === null || err === void 0 ? void 0 : err.keyPattern)[0];
        return res.status(500).json({
            STATUS_RESPONSE: 'FAILURE',
            STATUS_MESSAGE: "DUPLICATE KEY ".concat(key),
            STATUS_DATA: ((_c = (_b = err === null || err === void 0 ? void 0 : err.response) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.message) || (err === null || err === void 0 ? void 0 : err.message),
        });
    }
    res.status(500).json({
        STATUS_RESPONSE: 'FAILURE',
        STATUS_MESSAGE: 'INTERNAL SERVER ERROR',
        STATUS_DATA: ((_e = (_d = err === null || err === void 0 ? void 0 : err.response) === null || _d === void 0 ? void 0 : _d.data) === null || _e === void 0 ? void 0 : _e.message) || (err === null || err === void 0 ? void 0 : err.message),
    });
};
exports.handleError = handleError;
