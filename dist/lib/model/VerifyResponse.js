"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class VerifyResponse {
    constructor(verifyResponse) {
        var _a, _b, _c;
        this.username = (_a = verifyResponse === null || verifyResponse === void 0 ? void 0 : verifyResponse.username) !== null && _a !== void 0 ? _a : '';
        this.iat = (_b = verifyResponse === null || verifyResponse === void 0 ? void 0 : verifyResponse.iat) !== null && _b !== void 0 ? _b : 0;
        this.exp = (_c = verifyResponse === null || verifyResponse === void 0 ? void 0 : verifyResponse.exp) !== null && _c !== void 0 ? _c : 0;
    }
}
exports.default = VerifyResponse;
//# sourceMappingURL=VerifyResponse.js.map