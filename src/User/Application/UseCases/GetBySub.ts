import { inject, injectable } from "tsyringe";
import IUserRepository from "../../Domain/Repositories/UserRepository";
import { User } from "../../Domain/Entities/User";
import { RepoToken } from "../../../Shared/DI/Tokens/DITokens";

@injectable()
class GetBySubUseCase
{
    constructor(
        @inject(RepoToken.UserRepository) private userRepository: IUserRepository
    ) { }

    async execute(sub: string): Promise<User | null>
    {
        const result = await this.userRepository.getBySub(sub)

        return result
    }
}

export default GetBySubUseCase