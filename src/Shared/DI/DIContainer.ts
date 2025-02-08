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
import ICacheRepository from '../../Cache/Domain/Repositories/ICacheRepository';
import RedisCacheRepository from '../../Cache/Infrastructure/Repositories/RedisCacheRepository';
import IAIService from '../../AI/Domain/Repositories/IAIRepository';
import OpenAIService from '../../AI/Infrastructure/Repositories/OpenAIService';
import ChatUseCase from '../../AI/Application/Usecases/AIChat';

function setupContainer()
{
  console.log('📌 Registering dependencies...');

  container.registerSingleton<IUserRepository>(
    RepoToken.UserRepository,
    PrismaUserRepository,
  );

  container.registerSingleton<ICacheRepository>(
    RepoToken.CacheRepository,
    RedisCacheRepository,
  );

  container.registerSingleton<IAIService>(
    RepoToken.AIRepository,
    OpenAIService
  )

  // REGISTR AI USE CASES
  container.registerSingleton(UsecaseToken.AI.SendMessage, ChatUseCase)

  // REGISTER USER USE CASES
  container.registerSingleton(UsecaseToken.User.ListUsers, ListUsersUseCase);
  container.registerSingleton(UsecaseToken.User.GetOneUser, GetOneUserUseCase);
  container.registerSingleton(UsecaseToken.User.GetByIdentifier, GetByIdentifierUseCase);
  container.registerSingleton(UsecaseToken.User.UpdateUser, UpdateUserUseCase);
  container.registerSingleton(UsecaseToken.User.DeleteUser, DeleteUserUseCase);
  container.registerSingleton(UsecaseToken.User.SaveUser, SaveUserUseCase);
  container.registerSingleton(UsecaseToken.User.GetMe, GetMeUseCase);

  console.log('✅ Dependencies registered successfully');
}

export default setupContainer;
