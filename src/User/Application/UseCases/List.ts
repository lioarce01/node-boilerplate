import { inject, injectable } from "tsyringe";
import IUserRepository from "../../Domain/Repositories/UserRepository";
import { User } from "../../Domain/Entities/User";

@injectable()
class ListUsersUseCase
{
    constructor(
        @inject("UserRepository") private userRepository: IUserRepository
    ) { }

    async execute(): Promise<User[] | []>
    {
        const result = await this.userRepository.list()

        return result
    }
}

export default ListUsersUseCase