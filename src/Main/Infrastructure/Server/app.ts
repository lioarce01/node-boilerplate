import "reflect-metadata"
import Fastify from 'fastify'
import { ErrorHandler } from '../Errors/ErrorHandler'
import { setupContainer } from '../../../Shared/DI/DIContainer'
import { APIConfig } from '../../../Shared/Config/serverConfig'
import routes from "./routesIndex"

setupContainer()

const server = Fastify({ logger: true })

server.register(routes, { prefix: `/api/${APIConfig.VERSION}` })

const errorHandler = new ErrorHandler();
server.setErrorHandler(errorHandler.handle.bind(errorHandler));

const start = async () =>
{
    try {
        await server.listen({ port: APIConfig.PORT })
        console.log(`Server running on port ${APIConfig.PORT}`)
    } catch (err) {
        server.log.error(err)
        process.exit(1)
    }
}

start()