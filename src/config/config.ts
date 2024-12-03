import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";

config();

const prisma = new PrismaClient();

export const appConfig = {
  port: process.env.PORT || 4000,
};

export default prisma;
