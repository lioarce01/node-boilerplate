import ICacheRepository from '@Cache/Domain/Repositories/ICacheRepository';
import Criteria from '@Main/Infrastructure/Criteria/Criteria';
import { RepoToken } from '@Shared/DI/Tokens/DITokens';
import User from '@User/Domain/Entities/User';
import IUserRepository from '@User/Domain/Repositories/UserRepository';
import { inject, injectable } from 'tsyringe';


@injectable()
class ListUsersUseCase
{
  constructor(
    @inject(RepoToken.UserRepository) private userRepository: IUserRepository,
    @inject(RepoToken.CacheRepository) private cacheRepository: ICacheRepository,
  )
  { }

  async execute(criteria: Criteria): Promise<User[] | []>
  {
    const cacheKey = this.generateCacheKey(criteria)
    const cachedUsers = await this.cacheRepository.get(cacheKey);

    if (cachedUsers) {
      console.log('Cache hit for key', cacheKey);
      return JSON.parse(cachedUsers);
    }

    console.log('Cache miss for key:', cacheKey);

    const result = await this.userRepository.list(criteria);

    await this.cacheRepository.set(cacheKey, JSON.stringify(result), 1800);

    console.log('Data cached for key:', cacheKey);
    return result;
  }

  private generateCacheKey(criteria: Criteria): string
  {
    return `users:${JSON.stringify(criteria.toObject())}`
  }
}

export default ListUsersUseCase;
