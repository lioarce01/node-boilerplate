import { container } from 'tsyringe';
import IUserRepository from '../../User/Domain/Repositories/UserRepository';
import PrismaUserRepository from '../../User/Infrastructure/Repositories/PrismaUserRepository';
import ListUsersUseCase from '../../User/Application/UseCases/List';
import GetOneUserUseCase from '../../User/Application/UseCases/GetOne';
import GetBySubUseCase from '../../User/Application/UseCases/GetBySub';
import UpdateUserUseCase from '../../User/Application/UseCases/Update';
import DeleteUserUseCase from '../../User/Application/UseCases/Delete';
import { RepoToken, UsecaseToken } from './Tokens/DITokens';

function setupContainer()
{
  container.registerSingleton<IUserRepository>(
    RepoToken.UserRepository,
    PrismaUserRepository,
  );
}

// REGISTER USE CASES
container.registerSingleton(UsecaseToken.User.ListUsers, ListUsersUseCase);
container.registerSingleton(UsecaseToken.User.GetOneUser, GetOneUserUseCase);
container.registerSingleton(UsecaseToken.User.GetOneBySub, GetBySubUseCase);
container.registerSingleton(UsecaseToken.User.UpdateUser, UpdateUserUseCase);
container.registerSingleton(UsecaseToken.User.DeleteUser, DeleteUserUseCase);

export default setupContainer;
