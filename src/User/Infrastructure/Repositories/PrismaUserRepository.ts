import { injectable } from 'tsyringe';
import User from '../../Domain/Entities/User';
import IUserRepository from '../../Domain/Repositories/UserRepository';
import BaseUserRepository from './PrismaBaseRepository';
import UserTransformer from '../Utils/UserTransformer';

@injectable()
class PrismaUserRepository extends BaseUserRepository implements IUserRepository
{
  async list(): Promise<User[]>
  {
    const users = await this.prisma.user.findMany();
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

  async save(user: User): Promise<User>
  {
    const prismaUser = await this.prisma.user.upsert({
      where: { sub: user.sub },
      update: {
        email: user.email,
        picture: user.picture,
        name: user.name,
      },
      create: {
        sub: user.sub,
        email: user.email,
        name: user.name,
        picture: user.picture,
      },
    });
    return UserTransformer.toDomain(prismaUser);
  }

  async update(authId: string, targetId: string, data: User):
    Promise<{ message: string, data: User }>
  {
    const [updater, target] = await Promise.all([
      this.tryGetBySub(authId),
      this.tryGetById(targetId),
    ]);

    PrismaUserRepository.checkAuthorization(updater.id, target.id);

    const updatedUser = await this.prisma.user.update({
      where: { id: targetId },
      data: { ...data, updatedAt: new Date() },
    });

    return {
      message: 'User updated successfully',
      data: this.transformer.toDomain(updatedUser),
    };
  }

  async delete(userId: string, targetId: string): Promise<{ message: string }>
  {
    const [user, target] = await Promise.all([
      this.tryGetBySub(userId),
      this.tryGetById(targetId),
    ]);

    PrismaUserRepository.checkAuthorization(user.id, target.id);
    await this.prisma.user.delete({ where: { id: targetId } });

    return { message: 'User deleted successfully' };
  }
}

export default PrismaUserRepository;
