"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("./auth.controller"));
const router = (0, express_1.Router)();
const connect = (app, path) => {
    router.use('/auth', auth_controller_1.default);
    // examples
    // router.use('/files', filesController);
    // router.use('/directories', directoriesController);
    // router.use('/statistics', statisticsController);
    // router.use('/share', shareController);
    app.use(path, router);
};
exports.connect = connect;
