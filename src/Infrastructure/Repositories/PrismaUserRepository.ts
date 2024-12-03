import { UserRepository } from "../../Domain/Repositories/UserRepository";
import { User } from "../../Domain/Entities/User";
import prisma from "../../config/config";
import { injectable } from "tsyringe";

@injectable()
export class PrismaUserRepository implements UserRepository {
  async getAllUsers(offset?: number, limit?: number): Promise<User[] | null> {
    const users = await prisma.user.findMany({
      ...(typeof offset !== "undefined" && { skip: offset }),
      ...(typeof limit !== "undefined" && { take: limit }),
    });

    return users;
  }
}
