import { inject, injectable } from 'tsyringe';
import IUserRepository from '../../Domain/Repositories/UserRepository';
import { RepoToken } from '../../../Shared/DI/Tokens/DITokens';

@injectable()
class DeleteUserUseCase
{
  constructor(
        @inject(RepoToken.UserRepository) private userRepository: IUserRepository,
  )
  { }

  async execute(userId: string, targetId: string): Promise<{ message: string }>
  {
    await this.userRepository.delete(userId, targetId);

    return { message: 'User deleted successfully' };
  }
}

export default DeleteUserUseCase;
