import { inject, injectable } from 'tsyringe';
import IUserRepository from '../../Domain/Repositories/UserRepository';
import { RepoToken } from '../../../Shared/DI/Tokens/DITokens';
import UpdateUserDTO from '../../Domain/DTOs/UpdateUserDTO';
import UserDTO from '../../Domain/DTOs/UserDTO';
import User from '../../Domain/Entities/User';
import { HTTPError } from '../../../Shared/Errors/HTTPError';

@injectable()
class UpdateUserUseCase
{
  constructor(
    @inject(RepoToken.UserRepository) private userRepository: IUserRepository,
  )
  { }

  async execute(userId: string, data: UpdateUserDTO):
    Promise<UserDTO>
  {
    const existingUser = await this.userRepository.getBySub(userId);
    if (!existingUser) {
      throw new HTTPError(404, "User not found")
    }

    const updatedUser = new User(
      existingUser.sub,
      data.email ?? existingUser.email,
      data.name ?? existingUser.name,
      data.picture ?? existingUser.picture,
      existingUser.createdAt,
      new Date(),
      existingUser.id
    );

    const result = await this.userRepository.update(userId, updatedUser);

    return result.toDto();
  }
}

export default UpdateUserUseCase;
