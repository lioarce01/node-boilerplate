"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupContainer = setupContainer;
require("reflect-metadata");
const tsyringe_1 = require("tsyringe");
const PrismaUserRepository_1 = require("../Repositories/PrismaUserRepository");
const GetAllUsers_1 = require("../../Application/UseCases/User/GetAllUsers");
function setupContainer() {
    tsyringe_1.container.registerSingleton("UserRepository", PrismaUserRepository_1.PrismaUserRepository);
}
//Register use cases
tsyringe_1.container.registerSingleton("GetAllUsers", GetAllUsers_1.GetAllUsers);
