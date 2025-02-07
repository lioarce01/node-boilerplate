import { container } from 'tsyringe';
import IUserRepository from '../../User/Domain/Repositories/UserRepository';
import PrismaUserRepository from '../../User/Infrastructure/Repositories/PrismaUserRepository';
import ListUsersUseCase from '../../User/Application/UseCases/List';
import UpdateUserUseCase from '../../User/Application/UseCases/Update';
import DeleteUserUseCase from '../../User/Application/UseCases/Delete';
import { RepoToken, UsecaseToken } from './Tokens/DITokens';
import SaveUserUseCase from '../../User/Application/UseCases/Save';
import GetByIdentifierUseCase from '../../User/Application/UseCases/GetByIdentifier';
import GetOneUserUseCase from '../../User/Application/UseCases/GetOne';
import GetMeUseCase from '../../User/Application/UseCases/GetMe';

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
container.registerSingleton(UsecaseToken.User.GetByIdentifier, GetByIdentifierUseCase);
container.registerSingleton(UsecaseToken.User.UpdateUser, UpdateUserUseCase);
container.registerSingleton(UsecaseToken.User.DeleteUser, DeleteUserUseCase);
container.registerSingleton(UsecaseToken.User.SaveUser, SaveUserUseCase);
container.registerSingleton(UsecaseToken.User.GetMe, GetMeUseCase)

export default setupContainer;
