import { FastifyRequest } from 'fastify';

import { VerifyOptions } from '@fastify/jwt';

declare module '@fastify/jwt' {
    export interface FastifyJWTOptions
    {
        verify?: (Partial<VerifyOptions> & {
            extractToken?: (request: FastifyRequest) => string | void;
        }) | undefined;
    }
}
