import { FastifyRequest, FastifyReply } from 'fastify';
import { inject, injectable } from 'tsyringe';
import ListUsersUseCase from '../../../Application/UseCases/List';
import GetOneUserUseCase from '../../../Application/UseCases/GetOne';
import GetBySubUseCase from '../../../Application/UseCases/GetBySub';
import UpdateUserUseCase from '../../../Application/UseCases/Update';
import DeleteUserUseCase from '../../../Application/UseCases/Delete';
import { UsecaseToken } from '../../../../Shared/DI/Tokens/DITokens';
import { errorResponse, successResponse } from '../../../../Shared/HTTP/ApiResponse';
import { HTTPError } from '../../../../Shared/Errors/HTTPError';

@injectable()
class UserController
{
  constructor(
    @inject(UsecaseToken.User.ListUsers) private listUsersUseCase: ListUsersUseCase,
    @inject(UsecaseToken.User.GetOneUser) private getOneUseCase: GetOneUserUseCase,
    @inject(UsecaseToken.User.GetOneBySub) private getBySubUseCase: GetBySubUseCase,
    @inject(UsecaseToken.User.UpdateUser) private updateUserUseCase: UpdateUserUseCase,
    @inject(UsecaseToken.User.DeleteUser) private deleteUserUseCase: DeleteUserUseCase,
  )
  { }

  async listUsers(req: FastifyRequest, res: FastifyReply)
  {
    try
    {
      const users = await this.listUsersUseCase.execute();

      res.status(200).send(successResponse(users));
    }
    catch (e)
    {
      if (e instanceof HTTPError)
      {
        res.status(e.statusCode).send(errorResponse(e));
      }
      else
      {
        const unexpectedError = new HTTPError(
          500,
          'Unexpected error ocurred',
        );
        res.status(500).send(errorResponse(unexpectedError));
      }
    }
  }
}

export default UserController;
