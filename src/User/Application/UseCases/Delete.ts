import { RepoToken } from '@Shared/DI/Tokens/DITokens';
import IUserRepository from '@User/Domain/Repositories/UserRepository';
import { inject, injectable } from 'tsyringe';


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
