import { inject, injectable } from "tsyringe";
import IUserRepository from "../../Domain/Repositories/UserRepository";
import { User } from "../../Domain/Entities/User";
import { RepoToken } from "../../../Shared/DI/Tokens/DITokens";

@injectable()
class saveUserUseCase
{
    constructor(
        @inject(RepoToken.UserRepository) private userRepository: IUserRepository
    ) { }

    async execute(userData: User): Promise<User>
    {
        const result = await this.userRepository.save(userData);
        return result;
    }
}

export default saveUserUseCase