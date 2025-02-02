import { config } from "dotenv"

config()

export const redisConfig = {
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
    url: process.env.REDIS_URL,
    port: process.env.REDIS_PORT
        ? parseInt(process.env.REDIS_PORT, 10)
        : undefined,
};