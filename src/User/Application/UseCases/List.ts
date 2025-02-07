import { inject, injectable } from 'tsyringe';
import IUserRepository from '../../Domain/Repositories/UserRepository';
import User from '../../Domain/Entities/User';
import { RepoToken } from '../../../Shared/DI/Tokens/DITokens';
import ICacheRepository from '../../../Cache/Domain/Repositories/ICacheRepository';

@injectable()
class ListUsersUseCase
{
  constructor(
    @inject(RepoToken.UserRepository) private userRepository: IUserRepository,
    @inject(RepoToken.CacheRepository) private cacheRepository: ICacheRepository,
  )
  { }

  async execute(): Promise<User[] | []>
  {
    const cacheKey = 'users';
    const cachedUsers = await this.cacheRepository.get(cacheKey);

    if (cachedUsers)
    {
      console.log('Cache hit for key', cacheKey);
      return JSON.parse(cachedUsers);
    }

    console.log('Cache miss for key:', cacheKey);

    const result = await this.userRepository.list();

    await this.cacheRepository.set(cacheKey, JSON.stringify(result), 1800);

    console.log('Data cached for key:', cacheKey);
    return result;
  }
}

export default ListUsersUseCase;
