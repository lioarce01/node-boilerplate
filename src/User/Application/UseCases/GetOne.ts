import { RepoToken } from '@Shared/DI/Tokens/DITokens';
import { NotFoundError } from '@Shared/Errors/HTTPError';
import User from '@User/Domain/Entities/User';
import IUserRepository from '@User/Domain/Repositories/UserRepository';
import { inject, injectable } from 'tsyringe';


@injectable()
class GetOneUserUseCase
{
  constructor(
    @inject(RepoToken.UserRepository) private userRepository: IUserRepository,
  )
  { }

  async execute(id: string): Promise<User | null>
  {
    const result = await this.userRepository.getOne(id);

    if (!result) {
      throw new NotFoundError('User not found');
    }

    return result;
  }
}

export default GetOneUserUseCase;
