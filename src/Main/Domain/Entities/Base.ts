class Base
{
  constructor(
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly id?: string,
  )
  {
    console.debug('Base entity initialized');
  }
}

export default Base;
