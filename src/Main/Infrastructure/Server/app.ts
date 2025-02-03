import "reflect-metadata"
import Fastify from 'fastify'
import { ErrorHandler } from '../Errors/ErrorHandler'
import { setupContainer } from '../../../Shared/DI/DIContainer'
import { APIConfig } from '../../../Shared/Config/serverConfig'
import routes from "./routesIndex"
import { errorResponse } from "../../../Shared/HTTP/ApiResponse"
import { HTTPError } from "../../../Shared/Errors/HTTPError"

setupContainer()

const server = Fastify({ logger: true })

server.register(routes, { prefix: `/api/${APIConfig.VERSION}` })

server.setErrorHandler((error, req, res) =>
{
    if (error instanceof HTTPError) {
        res.status(error.statusCode).send(errorResponse(error));
    } else {
        const unexpectedError = new HTTPError(500, "Internal Server Error");
        res.status(500).send(errorResponse(unexpectedError));
    }
});

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