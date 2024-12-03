import { User } from "@prisma/client";

export interface UserRepository {
  getAllUsers(offset?: number, limit?: number): Promise<User[] | null>;
}
