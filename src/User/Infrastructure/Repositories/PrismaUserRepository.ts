import { injectable } from "tsyringe";
import IUserRepository from "../../Domain/Repositories/UserRepository";
import { User } from "../../Domain/Entities/User";
import { BasePrismaRepository } from "../../../Main/Infrastructure/Repositories/BasePrismaRepository";
import UserTransformer from "../Utils/UserTransformer";
import { CustomError } from "../../../Main/Infrastructure/Errors/CustomError";

@injectable()
class PrismaUserRepository extends BasePrismaRepository<User> implements IUserRepository
{
    public entityName: string = "user";

    async list(): Promise<User[]>
    {
        const users = await this.prisma.user.findMany()

        return users.map((user) => UserTransformer.toDomain(user))
    }

    async getOne(id: string): Promise<User>
    {
        const user = await this.getOne(id)

        if (!user) {
            throw new Error("User not found");
        }

        return UserTransformer.toDomain(user);
    }

    async getBySub(sub: string): Promise<User>
    {
        const user = await this.prisma.user.findUnique({ where: { sub: sub } })

        if (!user) {
            throw new CustomError(
                404,
                "NOT_FOUND",
                "User not found"
            );
        }

        return UserTransformer.toDomain(user);
    }

    async save(element: User): Promise<User>
    {
        const user = await this.prisma.user.upsert({
            where: { sub: element.sub },
            update: {
                email: element.email,
                picture: element.picture
            },
            create: {
                sub: element.sub,
                email: element.sub,
                picture: element.picture,
                name: element.name ?? ""
            }
        })

        return UserTransformer.toDomain(user)
    }

    async update(authId: string, targetId: string, data: User): Promise<{ message: string, data: User }>
    {
        const userToUpdate = await this.prisma.user.findUnique({ where: { id: targetId } })
        const updater = await this.prisma.user.findUnique({ where: { sub: authId } })

        if (!updater || !userToUpdate) {
            throw new CustomError(
                404,
                "NOT_FOUND",
                "Auth user or target user not found"
            )
        }

        if (updater.id === userToUpdate.id) {
            const updatedUser = await this.prisma.user.update({
                where: {
                    id: targetId
                },
                data: {
                    ...data,
                    updatedAt: new Date()
                }
            })

            return {
                message: "User updated successfully",
                data: UserTransformer.toDomain(updatedUser)
            }
        }

        throw new CustomError(
            403,
            "UNAUTHORIZED",
            "You are not authorized to update this user"
        )
    }

    async delete(id: string): Promise<{ message: string }>
    {
        const { message } = await this.baseDelete(id)

        return {
            message
        }
    }
}





export default PrismaUserRepository