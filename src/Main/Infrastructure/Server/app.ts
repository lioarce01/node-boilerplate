import 'reflect-metadata';
import Fastify, { FastifyReply, FastifyRequest } from 'fastify';

import setupContainer from '../../../Shared/DI/DIContainer';

import APIConfig from '../../../Shared/Config/serverConfig';
import routes from './routesIndex';

import { errorResponse } from '../../../Shared/HTTP/ApiResponse';
import { HTTPError } from '../../../Shared/Errors/HTTPError';

import AuthPlugin from '../../../Auth/Plugins/AuthPlugin';

setupContainer();

const app = Fastify({ logger: true });

app.register(AuthPlugin);

app.register(routes, { prefix: `/api/${APIConfig.VERSION}` });

app.setErrorHandler((error, request: FastifyRequest, reply: FastifyReply) =>
{
  console.error('Error occurred:', {
    message: error.message,
    stack: error.stack,
    timestamp: new Date().toISOString(),
    url: request.url,
    method: request.method,
  });

  if (error instanceof HTTPError)
  {
    reply.status(error.statusCode).send(errorResponse(error));
    return;
  }

  if (error.validation)
  {
    const validationError = new HTTPError(400, 'Validation Error', error.message);
    reply.status(400).send(errorResponse(validationError));
    return;
  }

  const unexpectedError = new HTTPError(500, 'Internal Server Error');
  reply.status(500).send(errorResponse(unexpectedError));
});

const start = async () =>
{
  try
  {
    await app.listen({ port: APIConfig.PORT });
    console.log(`Server running on port ${APIConfig.PORT}`);
  }
  catch (err)
  {
    app.log.error(err);
    process.exit(1);
  }
};

start();
