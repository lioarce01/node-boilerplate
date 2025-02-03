import { inject, injectable } from "tsyringe";
import IUserRepository from "../../Domain/Repositories/UserRepository";
import { RepoToken } from "../../../Shared/DI/Tokens/DITokens";

@injectable()
class DeleteUserUseCase
{
    constructor(
        @inject(RepoToken.UserRepository) private userRepository: IUserRepository
    ) { }

    async execute(id: string): Promise<{ message: string }>
    {
        await this.userRepository.delete(id)

        return { message: "User deleted successfully" }
    }
}

export default DeleteUserUseCase