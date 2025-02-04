import Base from '../../../Main/Domain/Entities/Base';

export default class User extends Base
{
  constructor(
    id: string,
    private _sub: string,
    private _name: string,
    private _email: string,
    private _picture: string,
    createdAt: Date,
    updatedAt: Date,
  )
  {
    super(id, createdAt, updatedAt);
  }

  get name(): string
  {
    return this._name;
  }

  get sub(): string
  {
    return this._sub;
  }

  get email(): string
  {
    return this._email;
  }

  get picture(): string
  {
    return this._picture;
  }
}
