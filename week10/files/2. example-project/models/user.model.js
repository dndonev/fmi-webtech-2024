"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.userSchema = void 0;
const mongoose_1 = require("mongoose");
exports.userSchema = new mongoose_1.Schema({
    id: mongoose_1.Schema.Types.ObjectId,
    firstName: {
        type: mongoose_1.Schema.Types.String,
        required: true
    },
    lastName: {
        type: mongoose_1.Schema.Types.String,
        required: true
    },
    email: {
        type: mongoose_1.Schema.Types.String,
        required: true,
        match: [/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, 'Invalid email']
    },
    password: {
        type: mongoose_1.Schema.Types.String,
        required: true
    },
    username: {
        type: mongoose_1.Schema.Types.String,
        required: true
    },
    createDate: {
        type: mongoose_1.Schema.Types.Date,
        default: Date.now
    },
    lastEdited: {
        type: mongoose_1.Schema.Types.Date,
        default: Date.now
    },
});
exports.UserModel = (0, mongoose_1.model)('User', exports.userSchema);
