import { inject, injectable } from "tsyringe";
import { RepoToken } from "../../../Shared/DI/Tokens/DITokens";
import IUserRepository from "../../Domain/Repositories/UserRepository";
import { NotFoundError } from "../../../Shared/Errors/HTTPError";
import User from "../../Domain/Entities/User";


@injectable()
class GetMeUseCase
{
    constructor(
        @inject(RepoToken.UserRepository) private userRepository: IUserRepository
    ) { }

    async execute(id: string): Promise<User>
    {
        const result = await this.userRepository.getMe(id)

        if (!result) {
            throw new NotFoundError('User not found')
        }

        return result
    }
}

export default GetMeUseCase