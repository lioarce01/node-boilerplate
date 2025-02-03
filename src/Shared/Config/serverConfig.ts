import { config } from 'dotenv'

config()

export const APIConfig = {
    PORT: Number(process.env.PORT),
    VERSION: "v1"
}