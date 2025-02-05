import Base from '../../../Main/Domain/Entities/Base';
import UserDTO from '../DTOs/UserDTO';

export default class User extends Base
{
  constructor(
    public readonly sub: string,
    public readonly email: string,
    public readonly name: string,
    public readonly picture: string,
    createdAt: Date,
    updatedAt: Date,
    id?: string,
  )
  {
    super(createdAt, updatedAt, id);
  }

  getSub(): string
  {
    return this.sub;
  }

  getEmail(): string
  {
    return this.email;
  }

  getName(): string
  {
    return this.name;
  }

  getPicture(): string
  {
    return this.picture;
  }

  public toDto(): UserDTO
  {
    return new UserDTO(
      this.id ?? '',
      this.sub,
      this.name,
      this.email,
      this.picture,
      this.createdAt,
      this.updatedAt,
    );
  }
}
