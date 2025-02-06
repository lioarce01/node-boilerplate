class UserDTO
{
  constructor(
    public readonly id: string,
    public readonly sub: string,
    public readonly name: string,
    public readonly email: string,
    public readonly picture: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  )
  {
    console.log('User entity initialized');
  }
}

export default UserDTO;
