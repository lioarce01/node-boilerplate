import { HTTPError } from '@Shared/Errors/HTTPError';
import { errorResponse } from '@Shared/HTTP/ApiResponse';
import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';


export function errorHandler(
    error: FastifyError,
    request: FastifyRequest,
    reply: FastifyReply
)
{
    console.error('Error occurred:', {
        message: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString(),
        url: request.url,
        method: request.method,
    });

    if (error instanceof HTTPError) {
        reply.status(error.statusCode).send(errorResponse(error));
        return;
    }

    if (error.validation) {
        const validationError = new HTTPError(400, 'Validation Error', error.message);
        reply.status(400).send(errorResponse(validationError));
        return;
    }

    const unexpectedError = new HTTPError(500, 'Internal Server Error');
    reply.status(500).send(errorResponse(unexpectedError));
}
