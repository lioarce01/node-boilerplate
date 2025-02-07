import 'reflect-metadata';
import Fastify from 'fastify';

import setupContainer from '../../../Shared/DI/DIContainer';

import APIConfig from '../../../Shared/Config/serverConfig';
import routes from './routesIndex';

import AuthPlugin from '../../../Auth/Plugins/AuthPlugin';

import fastifyHelmet from '@fastify/helmet';
import { errorHandler } from '../Errors/ErrorHandler';

setupContainer();

const app = Fastify({ logger: true });

app.register(fastifyHelmet)

app.register(AuthPlugin);

app.register(routes, { prefix: `/api/${APIConfig.VERSION}` });

app.setErrorHandler(errorHandler);

const start = async () =>
{
  try {
    await app.listen({ port: APIConfig.PORT });
    console.log(`Server running on port ${APIConfig.PORT}`);
  }
  catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
