import Fastify from 'fastify';
import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';
import UserRoutes from './src/User/Infrastructure/HTTP/Routes/UserRoutes'
import fs from 'fs';

const app = Fastify();

app.register(swagger, {
    openapi: {
        info: {
            title: 'Tu API',
            description: 'Descripción de tu API',
            version: '1.0.0',
        },
    },
});

app.register(swaggerUI, {
    routePrefix: '/docs',
    uiConfig: {
        docExpansion: 'full',
        deepLinking: false,
    },
});

app.register(UserRoutes);

app.ready((err) =>
{
    if (err) throw err;
    const openapi = app.swagger();
    fs.writeFileSync('./openapi.json', JSON.stringify(openapi, null, 2));
    console.log('Documentación generada en openapi.json');
    process.exit(0);
});
