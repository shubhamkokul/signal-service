"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenManagement = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const VerifyResponse_1 = __importDefault(require("../model/VerifyResponse"));
class TokenManagement {
    constructor(secret) {
        this.secret = secret;
    }
    getTokenData(token) {
        try {
            return (0, jsonwebtoken_1.verify)(token, this.secret, { complete: true });
        }
        catch (err) {
            return undefined;
        }
    }
    createTokenFromUserName(username) {
        return (0, jsonwebtoken_1.sign)({ username: username }, this.secret, { algorithm: "HS256", expiresIn: "30d" });
    }
    verfiyToken(token, username) {
        const response = this.getTokenData(token);
        if (response && response.payload) {
            const payload = response.payload;
            return payload.username === username;
        }
        return false;
    }
    getDataFromToken(token) {
        const response = this.getTokenData(token);
        if (response && response.payload) {
            return new VerifyResponse_1.default(response.payload);
        }
        return new VerifyResponse_1.default();
    }
}
exports.TokenManagement = TokenManagement;
//# sourceMappingURL=token.js.map