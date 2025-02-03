import { inject, injectable } from "tsyringe";
import { User } from "../../Domain/Entities/User";
import IUserRepository from "../../Domain/Repositories/UserRepository";
import { RepoToken } from "../../../Shared/DI/Tokens/DITokens";
import { NotFoundError } from "../../../Shared/Errors/HTTPError";

@injectable()
class GetOneUserUseCase
{
    constructor(
        @inject(RepoToken.UserRepository) private userRepository: IUserRepository
    ) { }

    async execute(id: string): Promise<User | null>
    {
        const result = await this.userRepository.getOne(id)

        if (!result) {
            throw new NotFoundError("User not found")
        }

        return result
    }
}

export default GetOneUserUseCase