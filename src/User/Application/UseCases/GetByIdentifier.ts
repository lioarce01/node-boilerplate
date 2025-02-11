import { inject, injectable } from 'tsyringe';
import { RepoToken } from '@Shared/DI/Tokens/DITokens';
import IUserRepository from '@User/Domain/Repositories/UserRepository';
import User from '../../Domain/Entities/User';


@injectable()
class GetByIdentifierUseCase
{
  constructor(
    @inject(RepoToken.UserRepository) private userRepository: IUserRepository,
  )
  { }

  async execute(identifier: string): Promise<User | null>
  {
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(identifier);

    return isObjectId
      ? await this.userRepository.getOne(identifier)
      : await this.userRepository.getBySub(identifier);
  }
}

export default GetByIdentifierUseCase;
