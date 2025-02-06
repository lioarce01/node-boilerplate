import fp from 'fastify-plugin';

import _auth0Verify from 'fastify-auth0-verify';
import getJwks from '../Utils/GetJwks';

export default fp(async (fastify) =>
{
  fastify.register(require('@fastify/jwt'), {
    decode: { complete: true },
    secret: async (_: any, token:
      {
        header:
        { kid: string; alg: string };
        payload: { iss: string }
      }) =>
    {
      if (!token) {
        throw new Error('Missing or invalid token');
      }

      const { header: { kid, alg }, payload: { iss } } = token;

      try {
        const publicKey = await getJwks.getPublicKey({ kid, domain: iss, alg });
        return publicKey;
      }
      catch (err) {
        if (err instanceof Error) {
          console.log('Invalid Token', err.message);
        }
        else {
          console.log('Invalid Token', String(err));
        }
        throw new Error('Invalid token');
      }
    },
  });

  fastify.decorate('authenticate', async (request, reply) =>
  {
    try {
      await request.jwtVerify();
    }
    catch (err) {
      reply.code(401).send({ error: 'Unauthorized', message: err instanceof Error ? err.message : 'Unknown error' });
    }
  });
});
