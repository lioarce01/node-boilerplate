import { RepoToken } from '@Shared/DI/Tokens/DITokens';
import CreateUserDTO from '@User/Domain/DTOs/CreateUserDTO';
import UserDTO from '@User/Domain/DTOs/UserDTO';
import User from '@User/Domain/Entities/User';
import IUserRepository from '@User/Domain/Repositories/UserRepository';
import { inject, injectable } from 'tsyringe';


@injectable()
class SaveUserUseCase
{
  constructor(
    @inject(RepoToken.UserRepository) private userRepository: IUserRepository,
  )
  { }

  async execute(userData: CreateUserDTO): Promise<UserDTO>
  {
    const userEntity = new User(
      userData.sub,
      userData.email,
      userData.name,
      userData.picture,
      new Date(),
      new Date(),
    );

    const savedUser = await this.userRepository.save(userEntity);
    return savedUser.toDto();
  }
}
export default SaveUserUseCase;
