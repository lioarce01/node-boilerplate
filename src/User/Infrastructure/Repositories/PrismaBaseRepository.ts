import { NotAuthorizedError, NotFoundError } from "../../../Shared/Errors/HTTPError";
import { User } from "../../Domain/Entities/User";
import { UserTransformer } from "../Utils/UserTransformer";
import { PrismaClient } from "@prisma/client";

export abstract class BaseUserRepository
{
    protected prisma = new PrismaClient();
    protected transformer = UserTransformer;

    protected async tryGetById(id: string): Promise<User>
    {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user) throw new NotFoundError("User not found");
        return this.transformer.toDomain(user);
    }

    protected async tryGetBySub(sub: string): Promise<User>
    {
        const user = await this.prisma.user.findUnique({ where: { sub } });
        if (!user) throw new NotFoundError("User not found");
        return this.transformer.toDomain(user);
    }

    protected checkAuthorization(updaterId: string, targetId: string): void
    {
        if (updaterId !== targetId) throw new NotAuthorizedError("Not authorized");
    }
}