import { Prisma, PrismaClient } from "@prisma/client";
import { prisma } from "../../../Shared/Config/prisma";
import { CustomError } from "../Errors/CustomError";

export abstract class BasePrismaRepository<T>
{
    protected prisma: PrismaClient = prisma
    protected abstract entityName: string


    protected handleNotFound(entityId: string, entity?: any): void
    {
        if (!entity) {
            throw new CustomError(
                404,
                "NOT_FOUND",
                `${this.entityName} with ID ${entityId} not found`
            )
        }
    }


    protected async getOne(id: string): Promise<any>
    {
        const entity = await (this.prisma as any)[this.entityName].findUnique({
            where: { id }
        })

        this.handleNotFound(id, entity)
        return entity
    }

    protected async list(): Promise<any>
    {
        const entityList = await (this.prisma as any)[this.entityName].findMany()

        return entityList
    }

    protected async baseDelete(id: string): Promise<{ message: string }>
    {
        const { message } = await (this.prisma as any)[this.entityName].delete({ where: { id } })

        return {
            message: `${this.entityName} with ID ${id} deleted successfully`
        }
    }

    protected buildPagination(
        offset: number = 0,
        limit: number = 10,
    ): { skip: number; take: number }
    {
        return {
            skip: offset,
            take: limit
        }
    }

    protected runTransaction<T>(
        fn: (prisma: Prisma.TransactionClient) => Promise<T>,
    ): Promise<T>
    {
        return this.prisma.$transaction(fn)
    }
}