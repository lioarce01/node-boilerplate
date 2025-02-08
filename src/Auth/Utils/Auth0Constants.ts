import { config } from 'dotenv';

config();

export const auth0Domain = process.env.AUTH0_DOMAIN!;
export const auth0Audience = process.env.AUTH0_AUDIENCE!;
