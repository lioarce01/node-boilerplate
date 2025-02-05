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
import SaveUserUseCase from '../../../Application/UseCases/Save';

@injectable()
class UserController
{
  constructor(
    @inject(UsecaseToken.User.ListUsers) private listUsersUseCase: ListUsersUseCase,
    @inject(UsecaseToken.User.GetOneUser) private getOneUseCase: GetOneUserUseCase,
    @inject(UsecaseToken.User.GetOneBySub) private getBySubUseCase: GetBySubUseCase,
    @inject(UsecaseToken.User.UpdateUser) private updateUserUseCase: UpdateUserUseCase,
    @inject(UsecaseToken.User.DeleteUser) private deleteUserUseCase: DeleteUserUseCase,
    @inject(UsecaseToken.User.SaveUser) private saveUserUseCase: SaveUserUseCase,
  )
  { }

  async listUsers(req: FastifyRequest, res: FastifyReply)
  {
    try
    {
      const users = await this.listUsersUseCase.execute();

      return res.status(200).send(successResponse(users));
    }
    catch (e)
    {
      if (e instanceof HTTPError)
      {
        return res.status(e.statusCode).send(errorResponse(e));
      }

      const unexpectedError = new HTTPError(
        500,
        'Unexpected error ocurred',
      );
      return res.status(500).send(errorResponse(unexpectedError));
    }
  }

  async createUser(req: FastifyRequest, res: FastifyReply)
  {
    try
    {
      const {
        sub, email, picture, name,
      } = req.user;

      const userDTO = await this.saveUserUseCase.execute({
        sub,
        email,
        name,
        picture,
      });

      return res.status(201).send(successResponse(userDTO));
    }
    catch (e)
    {
      if (e instanceof HTTPError)
      {
        return res.status(e.statusCode).send(errorResponse(e));
      }

      const unexpectedError = new HTTPError(
        500,
        'Unexpected error ocurred',
      );
      return res.status(500).send(errorResponse(unexpectedError));
    }
  }
}

export default UserController;
