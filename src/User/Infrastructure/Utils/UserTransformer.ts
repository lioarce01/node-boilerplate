import { User as PrismaUser } from '@prisma/client';
import User from '../../Domain/Entities/User';

class UserTransformer
{
  static toDomain(
    user: PrismaUser,
  ): User
  {
    return new User(
      user.id,
      user.sub,
      user.name,
      user.email,
      user.picture,
      user.createdAt,
      user.updatedAt,
    );
  }
}

export default UserTransformer;
