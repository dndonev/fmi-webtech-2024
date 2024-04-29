"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveRefreshToken = exports.signToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const token_model_1 = require("../models/token.model");
const signToken = (payload) => {
    const accessToken = (0, jsonwebtoken_1.sign)(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '20m' });
    const refreshToken = (0, jsonwebtoken_1.sign)(payload, process.env.REFRESH_TOKEN_SECRET);
    return { accessToken, refreshToken };
};
exports.signToken = signToken;
const saveRefreshToken = (refreshToken) => {
    const token = new token_model_1.RefreshTokenModel({
        refreshToken
    });
    return token.save();
};
exports.saveRefreshToken = saveRefreshToken;
