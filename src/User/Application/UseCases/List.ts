import { inject, injectable } from "tsyringe";
import IUserRepository from "../../Domain/Repositories/UserRepository";
import { User } from "../../Domain/Entities/User";
import { RepoToken } from "../../../Shared/DI/Tokens/DITokens";

@injectable()
class ListUsersUseCase
{
    constructor(
        @inject(RepoToken.UserRepository) private userRepository: IUserRepository
    ) { }

    async execute(): Promise<User[] | []>
    {
        const result = await this.userRepository.list()

        return result
    }
}

export default ListUsersUseCase