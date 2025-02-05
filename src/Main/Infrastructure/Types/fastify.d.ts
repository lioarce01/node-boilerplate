import 'fastify';
import '@fastify/jwt';
import { DependencyContainer } from 'tsyringe';

declare module 'fastify' {
    interface FastifyInstance
    {
        container: DependencyContainer;
    }
}

declare module '@fastify/jwt' {
    interface FastifyJWT
    {
        payload: {
            sub: string;
            name: string;
            email: string;
            picture: string;
        };
        user: {
            sub: string;
            name: string;
            email: string;
            picture: string;
        };
    }
}
