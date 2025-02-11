import { FastifyInstance } from 'fastify';
import setupContainer from '@Shared/DI/DIContainer';
import userRoutes from '@User/Infrastructure/HTTP/Routes/UserRoutes';
import chatRoutes from '@AI/Infrastructure/HTTP/Routes/ChatRoutes';


export default async function routes(fastify: FastifyInstance)
{
  setupContainer();
  // all entities/services routes
  fastify.register(userRoutes, { prefix: '/users' });
  fastify.register(chatRoutes, { prefix: '/chat' })
}
