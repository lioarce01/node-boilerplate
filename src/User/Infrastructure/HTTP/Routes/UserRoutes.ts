import { FastifyInstance } from 'fastify';
import { container } from 'tsyringe';
import UserController from '@User/Infrastructure/HTTP/Controllers/UserController';
import { CreateUserSchema, DeleteUserSchema, GetMeSchema, GetUserByIdSchema, ListUsersSchema, UpdateUserSchema } from '@Shared/Schemas/UserSchema';

export default async function userRoutes(fastify: FastifyInstance)
{
  const userController = container.resolve(UserController);

  fastify.get('/',
    {
      schema: ListUsersSchema
    },
    (req, res) => userController.listUsers(req, res))

  fastify.post('/',
    {
      onRequest: fastify.authenticate,
      schema: CreateUserSchema
    }, (req, res) => userController.createUser(req, res));

  fastify.get('/me', {
    onRequest: fastify.authenticate,
    schema: GetMeSchema
  }, (req, res) => userController.getMe(req, res));

  fastify.put('/update', {
    onRequest: fastify.authenticate,
    schema: UpdateUserSchema
  }, (req: any, res) => userController.updateUser(req, res));

  fastify.delete('/delete', {
    onRequest: fastify.authenticate,
    schema: DeleteUserSchema
  }, (req: any, res) => userController.deleteUser(req, res));

  fastify.get('/:identifier',
    {
      schema: GetUserByIdSchema
    },
    (req: any, res) => userController.getByIdentifier(req, res));
}
