import IAIService from "../../Domain/Repositories/IAIRepository";
import OpenAI from "openai";
import AIAPI from "../Utils/AIAPIKey";

class OpenAIService implements IAIService
{
    private openai: OpenAI
    constructor()
    {
        this.openai = new OpenAI({
            // baseURL: AIAPI.DeekSeepBaseURL,
            apiKey: AIAPI.OpenAIAPIKey
        })
    }

    async sendMessage(message: string): Promise<{ message: string }>
    {
        try {
            const response = await this.openai.chat.completions.create({
                messages: [{ role: 'user', content: message }],
                model: 'gpt-3.5-turbo'
            });

            return {
                message: response.choices[0].message.content ?? ''
            };
        } catch (error) {
            console.error("Error sending message to AI Service:", error);
            throw new Error("Internal Error in AI Services");
        }
    }
}

export default OpenAIService