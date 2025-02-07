export const RepoToken = {
  UserRepository: Symbol.for('UserRepository'),
};

export const UsecaseToken = {
  User: {
    ListUsers: Symbol.for('ListUsers'),
    GetOneUser: Symbol.for('GetOne'),
    GetByIdentifier: Symbol.for('GetByIdentifier'),
    UpdateUser: Symbol.for('UpdateUser'),
    DeleteUser: Symbol.for('DeleteUser'),
    SaveUser: Symbol.for('SaveUser'),
    GetMe: Symbol.for('GetMe')
  },
};
