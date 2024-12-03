"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const tsyringe_1 = require("tsyringe");
const User_1 = require("../Controllers/User");
const Container_1 = require("../../DI/Container");
(0, Container_1.setupContainer)();
const router = express_1.default.Router();
const userController = tsyringe_1.container.resolve(User_1.UserController);
router.get("/", (req, res, next) => userController.getAllUsers(req, res, next));
exports.default = router;
