class Base
{
  constructor(
    public readonly id: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  )
  {
    console.debug('Base entity initialized');
  }
}

export default Base;
