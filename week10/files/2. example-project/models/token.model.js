"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenModel = void 0;
const mongoose_1 = require("mongoose");
const refreshTokenSchema = new mongoose_1.Schema({
    refreshToken: mongoose_1.Schema.Types.String
});
exports.RefreshTokenModel = (0, mongoose_1.model)('Token', refreshTokenSchema);
