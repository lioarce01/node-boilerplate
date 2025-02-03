import { inject, injectable } from "tsyringe";
import { User } from "../../Domain/Entities/User";
import IUserRepository from "../../Domain/Repositories/UserRepository";
import { RepoToken } from "../../../Shared/DI/Tokens/DITokens";

@injectable()
class UpdateUserUseCase
{
    constructor(
        @inject(RepoToken.UserRepository) private userRepository: IUserRepository
    ) { }

    async execute(userId: string, targetId: string, data: User): Promise<{ message: string, data: User }>
    {
        const result = await this.userRepository.update(userId, targetId, data)

        return result
    }
}

export default UpdateUserUseCase