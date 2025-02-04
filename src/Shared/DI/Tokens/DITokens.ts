export const RepoToken = {
  UserRepository: Symbol.for('UserRepository'),
};

export const UsecaseToken = {
  User: {
    ListUsers: Symbol.for('ListUsers'),
    GetOneUser: Symbol.for('GetOne'),
    GetOneBySub: Symbol.for('GetBySub'),
    UpdateUser: Symbol.for('UpdateUser'),
    DeleteUser: Symbol.for('DeleteUser'),
  },
};
