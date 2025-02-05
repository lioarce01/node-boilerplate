import buildGetJwks from 'get-jwks';
import { auth0Domain } from './Auth0Constants';

const getJwks = buildGetJwks({
  jwksPath: '/.well-known/jwks.json',
  issuersWhitelist: [`https://${auth0Domain}/`],
  ttl: 3600 * 1000,
  max: 10,
});

export default getJwks;
