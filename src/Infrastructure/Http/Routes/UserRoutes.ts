import "reflect-metadata";
import express from "express";
import { container } from "tsyringe";
import { UserController } from "../Controllers/User";
import { setupContainer } from "../../DI/Container";

setupContainer();

const router = express.Router();

const userController = container.resolve(UserController);

router.get("/", (req, res, next) => userController.getAllUsers(req, res, next));

export default router;
