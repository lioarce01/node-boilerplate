import { FastifyInstance } from 'fastify';
import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';

export async function setupSwagger(app: FastifyInstance)
{
    await app.register(swagger, {
        openapi: {
            openapi: '3.0.0',
            info: {
                title: 'Hexagonal-fastify-API',
                description: 'API documentation generated with Fastify Swagger using ES module imports',
                version: '2.0.0',
            },
            servers: [
                {
                    url: 'http://localhost:4000',
                    description: 'Local development server',
                },
            ],
        },
    });

    await app.register(swaggerUI, {
        routePrefix: '/docs',
        uiConfig: {
            docExpansion: 'full',
            deepLinking: false,
        },
    });

    app.addSchema({
        $id: 'User',
        type: 'object',
        properties: {
            id: { type: 'string' },
            sub: { type: 'string' },
            name: { type: 'string' },
            email: { type: 'string', format: 'email' },
            picture: { type: 'string' },
            createdAt: { type: 'string' },
            updatedAt: { type: 'string' }
        },
        required: ['id', 'sub', 'name', 'email', 'picture'],
    });
}
