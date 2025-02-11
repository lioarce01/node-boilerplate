import { RepoToken } from '@Shared/DI/Tokens/DITokens';
import { HTTPError } from '@Shared/Errors/HTTPError';
import UpdateUserDTO from '@User/Domain/DTOs/UpdateUserDTO';
import UserDTO from '@User/Domain/DTOs/UserDTO';
import User from '@User/Domain/Entities/User';
import IUserRepository from '@User/Domain/Repositories/UserRepository';
import { inject, injectable } from 'tsyringe';


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
      throw new HTTPError(404, 'User not found');
    }

    const updatedUser = new User(
      existingUser.sub,
      data.email ?? existingUser.email,
      data.name ?? existingUser.name,
      data.picture ?? existingUser.picture,
      existingUser.createdAt,
      new Date(),
      existingUser.id,
    );

    const result = await this.userRepository.update(userId, updatedUser);

    return result.toDto();
  }
}

export default UpdateUserUseCase;
