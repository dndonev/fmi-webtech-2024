"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ').pop();
    if (!token) {
        return res.status(401).send('Invalid token format');
    }
    let user;
    try {
        user = (0, jsonwebtoken_1.verify)(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = user;
    }
    catch (err) {
        res.status(403).json(Object.assign(Object.assign({}, err), { message: 'Unable to verify token' }));
    }
    next();
};
exports.verifyToken = verifyToken;
