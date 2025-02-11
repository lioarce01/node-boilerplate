import { config } from 'dotenv'

config()

const AIAPI = {
    //BASE URLS
    DeekSeepBaseURL: process.env.DEEPSEEK_BASE_URL,

    //API KEYS
    OpenAIAPIKey: process.env.OPENAI_API_KEY,
    DeepSeekAPIKey: process.env.DEEPSEEK_API_KEY
}

export default AIAPI