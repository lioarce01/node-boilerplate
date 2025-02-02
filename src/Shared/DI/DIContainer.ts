import { container } from 'tsyringe'
import IUserRepository from '../../User/Domain/Repositories/UserRepository'
import PrismaUserRepository from '../../User/Infrastructure/Repositories/PrismaUserRepository'
import ListUsersUseCase from '../../User/Application/UseCases/List'
import GetOneUserUseCase from '../../User/Application/UseCases/GetOne'
import GetBySubUseCase from '../../User/Application/UseCases/GetBySub'
import UpdateUserUseCase from '../../User/Application/UseCases/Update'
import DeleteUserUseCase from '../../User/Application/UseCases/Delete'

export function setupContainer()
{
    container.registerSingleton<IUserRepository>(
        "UserRepository",
        PrismaUserRepository
    )
}

//REGISTER USE CASES
container.registerSingleton("ListUsers", ListUsersUseCase)
container.registerSingleton("GetOne", GetOneUserUseCase)
container.registerSingleton("GetBySub", GetBySubUseCase)
container.registerSingleton("UpdateUser", UpdateUserUseCase)
container.registerSingleton("DeleteUser", DeleteUserUseCase)