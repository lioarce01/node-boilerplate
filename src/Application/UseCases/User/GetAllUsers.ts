import { UserRepository } from "../../../Domain/Repositories/UserRepository";
import { User } from "../../../Domain/Entities/User";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetAllUsers {
  constructor(
    @inject("UserRepository")
    private userRepository: UserRepository,
  ) {}

  async execute(offset?: number, limit?: number): Promise<User[] | null> {
    const users = await this.userRepository.getAllUsers(offset, limit);

    return users;
  }
}
