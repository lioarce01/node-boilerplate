import { inject, injectable } from "tsyringe";
import { User } from "../../Domain/Entities/User";
import IUserRepository from "../../Domain/Repositories/UserRepository";

@injectable()
class GetOneUserUseCase
{
    constructor(
        @inject("UserRepository") private userRepository: IUserRepository
    ) { }

    async execute(id: string): Promise<User | null>
    {
        const result = await this.userRepository.getOne(id)

        return result
    }
}

export default GetOneUserUseCase