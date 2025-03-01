import { Prisma, PrismaClient } from '@prisma/client';
import prisma from '@Shared/Config/prisma';
import { BadRequestError, NotAuthorizedError, NotFoundError } from '@Shared/Errors/HTTPError';
import User from '@User/Domain/Entities/User';
import UserTransformer from '@User/Infrastructure/Utils/UserTransformer';
import Criteria from '../Criteria/Criteria';


export default abstract class BasePrismaRepository<_T>
{
  protected prisma: PrismaClient = prisma;

  protected abstract entityName: symbol

  protected transformer = UserTransformer;


  protected static handleNotFound(entityId: string, entity?: any): void
  {
    if (!entity) {
      throw new NotFoundError(`Entity with ID ${entityId} not found`);
    }
  }

  protected async tryGetById(id: string): Promise<User>
  {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundError('User not found');
    return this.transformer.toDomain(user);
  }

  protected async tryGetBySub(sub: string): Promise<User>
  {
    const user = await this.prisma.user.findUnique({ where: { sub } });
    if (!user) throw new NotFoundError('User not found');
    return this.transformer.toDomain(user);
  }

  protected async _list(criteria: Criteria): Promise<any>
  {
    const queryOptions = this.applyCriteria(criteria)
    const entityList = await (this.prisma as any)[this.entityName].findMany(queryOptions);

    return entityList.map(this.transformer.toDomain);
  }

  protected async baseDelete(id: string): Promise<{ message: string }>
  {
    await (this.prisma as any)[this.entityName].delete({ where: { id } });

    return {
      message: `${String(this.entityName)} with ID ${id} deleted successfully`,
    };
  }

  protected runTransaction<U>(
    fn: (txClient: Prisma.TransactionClient) => Promise<U>,
  ): Promise<U>
  {
    return this.prisma.$transaction(fn);
  }

  protected static checkAuthorization(updaterId: string, targetId: string): void
  {
    if (!updaterId || !targetId) {
      throw new BadRequestError('Invalid user IDs');
    }

    if (updaterId !== targetId) {
      throw new NotAuthorizedError('You are not authorized to perform this action');
    }
  }

  protected applyCriteria(criteria: Criteria):
    {
      where?: any;
      orderBy?: any;
      skip?: number;
      take?: number;
    }
  {
    return {
      where: this.buildWhere(criteria),
      orderBy: this.buildOrder(criteria),
      skip: criteria.pagination?.offset,
      take: criteria.pagination?.limit,
    };
  }

  private buildWhere(criteria: Criteria)
  {
    if (!criteria.filters.length) return undefined;

    return criteria.filters.reduce((acc, filter) =>
    {
      switch (filter.operator) {
        case 'EQUAL':
          acc[filter.field] = filter.value;
          break;
        case 'NOT_EQUAL':
          acc[filter.field] = { not: filter.value };
          break;
        case 'GREATER_THAN':
          acc[filter.field] = { gt: filter.value };
          break;
        case 'LESS_THAN':
          acc[filter.field] = { lt: filter.value };
          break;
        case 'LIKE':
          acc[filter.field] = { contains: filter.value, mode: 'insensitive' };
          break;
      }
      return acc;
    }, {} as any);
  }

  private buildOrder(criteria: Criteria)
  {
    return criteria.order ? { [criteria.order.field]: criteria.order.direction.toLowerCase() } : undefined;
  }
}