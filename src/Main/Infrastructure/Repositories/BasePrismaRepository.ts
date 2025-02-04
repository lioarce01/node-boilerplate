import { Prisma, PrismaClient } from '@prisma/client';
import prisma from '../../../Shared/Config/prisma';
import { NotFoundError } from '../../../Shared/Errors/HTTPError';

export default abstract class BasePrismaRepository<_T>
{
  protected prisma: PrismaClient = prisma;

  protected abstract entityName: string

  protected static handleNotFound(entityId: string, entity?: any): void
  {
    if (!entity)
    {
      throw new NotFoundError(`Entity with ID ${entityId} not found`);
    }
  }

  protected async getOne(id: string): Promise<any>
  {
    const entity = await (this.prisma as any)[this.entityName].findUnique({
      where: { id },
    });

    BasePrismaRepository.handleNotFound(id, entity);
    return entity;
  }

  protected async list(): Promise<any>
  {
    const entityList = await (this.prisma as any)[this.entityName].findMany();

    return entityList;
  }

  protected async baseDelete(id: string): Promise<{ message: string }>
  {
    await (this.prisma as any)[this.entityName].delete({ where: { id } });

    return {
      message: `${this.entityName} with ID ${id} deleted successfully`,
    };
  }

  protected static buildPagination(
    offset: number = 0,
    limit: number = 10,
  ): { skip: number; take: number }
  {
    return {
      skip: offset,
      take: limit,
    };
  }

  protected runTransaction<U>(
    fn: (txClient: Prisma.TransactionClient) => Promise<U>,
  ): Promise<U>
  {
    return this.prisma.$transaction(fn);
  }
}
