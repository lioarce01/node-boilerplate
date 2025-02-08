import { inject, injectable } from "tsyringe"
import { RepoToken } from "../../../Shared/DI/Tokens/DITokens"
import IAIService from "../../Domain/Repositories/IAIRepository"
@injectable()
class ChatUseCase
{
    constructor(
        @inject(RepoToken.AIRepository) private aiRepository: IAIService
    )
    { }

    async execute(message: string): Promise<{ message: string }>
    {
        if (!message) {
            throw new Error("Message cannot be empty!")
        }

        return await this.aiRepository.sendMessage(message)
    }
}

export default ChatUseCase