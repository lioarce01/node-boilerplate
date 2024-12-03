import "reflect-metadata";
import { container } from "tsyringe";
import { UserRepository } from "../../Domain/Repositories/UserRepository";
import { PrismaUserRepository } from "../Repositories/PrismaUserRepository";
import { GetAllUsers } from "../../Application/UseCases/User/GetAllUsers";

export function setupContainer() {
  container.registerSingleton<UserRepository>(
    "UserRepository",
    PrismaUserRepository,
  );
}

//Register use cases
container.registerSingleton("GetAllUsers", GetAllUsers);
