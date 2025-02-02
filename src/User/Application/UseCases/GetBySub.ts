import { inject, injectable } from "tsyringe";
import IUserRepository from "../../Domain/Repositories/UserRepository";
import { User } from "../../Domain/Entities/User";

@injectable()
class GetBySubUseCase
{
    constructor(
        @inject("UserRepository") private userRepository: IUserRepository
    ) { }

    async execute(sub: string): Promise<User | null>
    {
        const result = await this.userRepository.getBySub(sub)

        return result
    }
}

export default GetBySubUseCase