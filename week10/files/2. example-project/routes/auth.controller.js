"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = require("../models/user.model");
const token_model_1 = require("../models/token.model");
const verify_token_1 = require("../middlewares/verify-token");
const token_utils_1 = require("../utils/token.utils");
const authController = (0, express_1.Router)();
authController.post('/token', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.body.token;
    if (!token || token === '') {
        return res.status(400).json({ error: 'Invalid parameter - token' });
    }
    const tokenDocument = yield token_model_1.RefreshTokenModel.findOne({ token: token });
    if (!tokenDocument) {
        return res.sendStatus(403);
    }
    const refreshToken = tokenDocument.toJSON().refreshToken;
    let user;
    try {
        user = (0, jsonwebtoken_1.verify)(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const accessToken = (0, jsonwebtoken_1.sign)(user, process.env.ACCESS_TOKEN_SECRET);
        res.status(200).json({ accessToken });
    }
    catch (err) {
        res.status(400).json(err);
    }
}));
authController.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    if (!email || email === '') {
        return res.status(400).json({ error: 'Invalid email address' });
    }
    const userDocument = yield user_model_1.UserModel.findOne({ email });
    if (!userDocument) {
        return res.status(404).json({ error: 'User does not exist' });
    }
    const user = userDocument.toJSON();
    if (!(0, bcrypt_1.compareSync)(req.body.password, user.password)) {
        return res.status(403).json({ error: 'Invalid credentials' });
    }
    const tokens = (0, token_utils_1.signToken)(user);
    try {
        yield (0, token_utils_1.saveRefreshToken)(tokens.refreshToken);
        return res.json(tokens);
    }
    catch (err) {
        return res.json(err);
    }
    ;
}));
authController.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = req.body;
    const today = new Date();
    const userDocument = yield user_model_1.UserModel.findOne({
        email: req.body.email
    });
    if (!userDocument) {
        const hashed = yield (0, bcrypt_1.hash)(newUser.password, 10);
        const user = new user_model_1.UserModel({
            id: new mongoose_1.default.Types.ObjectId(),
            email: newUser.email,
            password: hashed,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            username: newUser.username
        });
        const validation = user.validateSync();
        if (validation) {
            return res.status(400).json(validation);
        }
        yield user.save();
        try {
            const tokens = (0, token_utils_1.signToken)(user.toJSON());
            yield (0, token_utils_1.saveRefreshToken)(tokens.refreshToken);
            return res.json(tokens);
        }
        catch (err) {
            res.send({ error: 'There was an error signing your token' });
        }
    }
    return res.json({ error: 'User already exists' });
}));
authController.post('/logout', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = req.body.token;
    if (!refreshToken || refreshToken === '') {
        return res.status(400).json({ error: 'Invalid parameter - token' });
    }
    const tokenDocument = yield token_model_1.RefreshTokenModel.findOneAndRemove({ refreshToken });
    if (!tokenDocument) {
        return res.status(403);
    }
    return res.status(204).send('You have been logged out');
}));
authController.get('/user-info', verify_token_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = (yield user_model_1.UserModel.findOne({ email: req.user.email }))
        .toJSON();
    return res.json(user);
}));
exports.default = authController;
