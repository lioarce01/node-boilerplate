import { inject, injectable } from 'tsyringe';
import IUserRepository from '@User/Domain/Repositories/UserRepository';
import { NotFoundError } from '@Shared/Errors/HTTPError';
import { RepoToken } from '@Shared/DI/Tokens/DITokens';
import User from '@User/Domain/Entities/User';

@injectable()
class GetMeUseCase
{
  constructor(
    @inject(RepoToken.UserRepository) private userRepository: IUserRepository,
  )
  { }

  async execute(id: string): Promise<User>
  {
    const result = await this.userRepository.getMe(id);

    if (!result) {
      throw new NotFoundError('User not found');
    }

    return result;
  }
}

export default GetMeUseCase;
