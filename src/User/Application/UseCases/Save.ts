import { inject, injectable } from 'tsyringe';
import IUserRepository from '../../Domain/Repositories/UserRepository';
import User from '../../Domain/Entities/User';
import { RepoToken } from '../../../Shared/DI/Tokens/DITokens';
import CreateUserDTO from '../../Domain/DTOs/CreateUserDTO';
import UserDTO from '../../Domain/DTOs/UserDTO';

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
