import { FastifyInstance } from 'fastify';
import { container } from 'tsyringe';
import UserController from '../Controllers/UserController';
import { any } from 'zod';

export default async function userRoutes(fastify: FastifyInstance)
{
  const userController = container.resolve(UserController);

  fastify.get('/', (req, res) => userController.listUsers(req, res));
  fastify.post('/', { onRequest: fastify.authenticate }, (req, res) => userController.createUser(req, res));
  fastify.put('/', { onRequest: fastify.authenticate }, (req: any, res) => userController.updateUser(req, res))
}
