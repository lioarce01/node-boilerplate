import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';

config();

const prisma = new PrismaClient();

export const appConfig = {
  port: process.env.PORT,
};

export default prisma;
