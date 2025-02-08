import { FastifyInstance } from 'fastify';
import userRoutes from '../../../User/Infrastructure/HTTP/Routes/UserRoutes';
import setupContainer from '../../../Shared/DI/DIContainer';

export default async function routes(fastify: FastifyInstance)
{
  setupContainer();
  // all entities routes
  fastify.register(userRoutes, { prefix: '/users' });
  // fastify.register(productsRoutes, { prefix: "/products" })  //EXAMPLE!
}
