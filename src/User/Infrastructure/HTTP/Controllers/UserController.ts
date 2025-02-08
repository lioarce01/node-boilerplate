import { FastifyRequest, FastifyReply } from 'fastify';
import { inject, injectable } from 'tsyringe';
import ListUsersUseCase from '../../../Application/UseCases/List';
import GetOneUserUseCase from '../../../Application/UseCases/GetOne';
import UpdateUserUseCase from '../../../Application/UseCases/Update';
import DeleteUserUseCase from '../../../Application/UseCases/Delete';
import { UsecaseToken } from '../../../../Shared/DI/Tokens/DITokens';
import { errorResponse, successResponse } from '../../../../Shared/HTTP/ApiResponse';
import { HTTPError } from '../../../../Shared/Errors/HTTPError';
import SaveUserUseCase from '../../../Application/UseCases/Save';
import GetByIdentifier from '../../../Application/UseCases/GetByIdentifier';
import GetMeUseCase from '../../../Application/UseCases/GetMe';
import Criteria from '../../../../Main/Infrastructure/Criteria/Criteria';

interface UpdateUserBody
{
  Body: {
    email: string;
    picture: string;
    name: string;
  };
}

@injectable()
class UserController
{
  constructor(
    @inject(UsecaseToken.User.ListUsers) private listUsersUseCase: ListUsersUseCase,
    @inject(UsecaseToken.User.GetOneUser) private getOneUseCase: GetOneUserUseCase,
    @inject(UsecaseToken.User.GetByIdentifier) private getByIdentifierUseCase: GetByIdentifier,
    @inject(UsecaseToken.User.UpdateUser) private updateUserUseCase: UpdateUserUseCase,
    @inject(UsecaseToken.User.DeleteUser) private deleteUserUseCase: DeleteUserUseCase,
    @inject(UsecaseToken.User.SaveUser) private saveUserUseCase: SaveUserUseCase,
    @inject(UsecaseToken.User.GetMe) private getMeUseCase: GetMeUseCase,
  )
  { }

  async listUsers(req: FastifyRequest, res: FastifyReply)
  {
    try {
      const criteria = Criteria.fromQueryParams(req.query)

      const users = await this.listUsersUseCase.execute(criteria);

      return res.status(200).send(successResponse(users));
    }
    catch (e) {
      if (e instanceof HTTPError) {
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
    try {
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
    catch (e) {
      if (e instanceof HTTPError) {
        return res.status(e.statusCode).send(errorResponse(e));
      }

      const unexpectedError = new HTTPError(
        500,
        'Unexpected error ocurred',
      );
      return res.status(500).send(errorResponse(unexpectedError));
    }
  }

  async updateUser(req: FastifyRequest<{ Body: UpdateUserBody }>, res: FastifyReply)
  {
    try {
      if (!req.user) {
        throw new HTTPError(401, 'Unauthorized: Missing user information');
      }

      const { sub } = req.user;
      const { email, picture, name } = req.body as any;

      if (!email || !picture || !name) {
        throw new HTTPError(400, 'Bad Request: Missing required fields');
      }

      const userDTO = await this.updateUserUseCase.execute(sub, { email, picture, name });

      return res.status(200).send(successResponse(userDTO));
    }
    catch (e) {
      if (e instanceof HTTPError) {
        return res.status(e.statusCode).send(errorResponse(e));
      }

      console.error('Unexpected error in updateUser:', e);

      return res.status(500).send(errorResponse(new HTTPError(500, 'Unexpected error occurred')));
    }
  }

  async deleteUser(req: FastifyRequest<{ Body: { id: string } }>, res: FastifyReply)
  {
    try {
      const { sub } = req.user;
      const { id } = req.body as any;
      if (!sub) {
        throw new HTTPError(401, 'Unauthorized: Missing user information');
      }

      const { message } = await this.deleteUserUseCase.execute(sub, id);

      return res.status(200).send(successResponse(message));
    }
    catch (e) {
      if (e instanceof HTTPError) {
        return res.status(e.statusCode).send(errorResponse(e));
      }

      return res.status(500).send(errorResponse(new HTTPError(500, 'Unexpected error occurred')));
    }
  }

  async getByIdentifier(req: FastifyRequest<{ Params: { identifier: string } }>, res: FastifyReply)
  {
    try {
      const { identifier } = req.params;

      if (!identifier) {
        throw new HTTPError(404, 'User not found');
      }

      const user = await this.getByIdentifierUseCase.execute(identifier);

      return res.status(200).send(successResponse(user));
    }
    catch (e) {
      if (e instanceof HTTPError) {
        return res.status(e.statusCode).send(errorResponse(e));
      }

      return res.status(500).send(errorResponse(new HTTPError(500, 'Unexpected error occurred')));
    }
  }

  async getMe(req: FastifyRequest, res: FastifyReply)
  {
    try {
      const { sub } = req.user;

      if (!sub) {
        throw new HTTPError(404, 'User not found');
      }

      const user = await this.getMeUseCase.execute(sub);

      return res.status(200).send(successResponse(user));
    }
    catch (e) {
      if (e instanceof HTTPError) {
        return res.status(e.statusCode).send(errorResponse(e));
      }

      return res.status(500).send(errorResponse(new HTTPError(500, 'Unexpected error occurred')));
    }
  }
}

export default UserController;
