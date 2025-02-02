export class ErrorHandler
{
    async handle(err: any, reply: any)
    {
        const statusCode = err.statusCode || 500;
        const message = err.message || 'Internal Server Error';
        reply.status(statusCode).send({ error: message });
    }
}