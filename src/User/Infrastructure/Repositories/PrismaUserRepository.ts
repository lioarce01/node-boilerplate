import EntityToken from '@Main/Domain/Entities/Tokens/EntityToken';
import Criteria from '@Main/Infrastructure/Criteria/Criteria';
import BasePrismaRepository from '@Main/Infrastructure/Repositories/BasePrismaRepository';
import { NotFoundError } from '@Shared/Errors/HTTPError';
import User from '@User/Domain/Entities/User';
import IUserRepository from '@User/Domain/Repositories/UserRepository';
import { injectable } from 'tsyringe';


@injectable()
class PrismaUserRepository extends BasePrismaRepository<User> implements IUserRepository
{
  protected entityName: symbol;
  constructor()
  {
    super();
    this.entityName = EntityToken.User;
  }

  async list(criteria: Criteria): Promise<User[]>
  {
    const queryOptions = this.applyCriteria(criteria);
    const users = await this.prisma.user.findMany(queryOptions);
    return users.map(this.transformer.toDomain);
  }

  async getOne(id: string): Promise<User>
  {
    return this.tryGetById(id);
  }

  async getBySub(sub: string): Promise<User>
  {
    return this.tryGetBySub(sub);
  }

  async getMe(sub: string): Promise<User>
  {
    return this.tryGetBySub(sub);
  }

  async save(user: User): Promise<User>
  {
    const prismaUser = await this.prisma.user.upsert({
      where: { sub: user.sub },
      update: {

      },
      create: {
        sub: user.sub,
        email: user.email,
        name: user.name,
        picture: user.picture,
      },
    });

    return this.transformer.toDomain(prismaUser);
  }

  async update(authId: string, data: Partial<User>): Promise<User>
  {
    const { id: _id, createdAt: _createdAt, ...updatedData } = data;
    const updatedUser = await this.prisma.user.update({
      where: { sub: authId },
      data: { ...updatedData, updatedAt: new Date() },
    });

    return this.transformer.toDomain(updatedUser);
  }

  async delete(userId: string, targetId: string): Promise<{ message: string }>
  {
    const [user, target] = await Promise.all([
      this.tryGetBySub(userId),
      this.tryGetById(targetId),
    ]);

    if (!user?.id) {
      throw new NotFoundError('User not found');
    }

    if (!target?.id) {
      throw new NotFoundError('Target user ID not found');
    }

    PrismaUserRepository.checkAuthorization(user.id, target.id);
    await this.prisma.user.delete({ where: { id: targetId } });

    return { message: `User with ID ${targetId} deleted successfully` };
  }
}

export default PrismaUserRepository;
