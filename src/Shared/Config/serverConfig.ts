import { config } from 'dotenv';

config();

const APIConfig = {
  PORT: Number(process.env.PORT),
  VERSION: 'v1',
};

export default APIConfig;
