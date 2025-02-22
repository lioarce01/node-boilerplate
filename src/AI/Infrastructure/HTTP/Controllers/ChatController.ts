import { inject, injectable } from "tsyringe";
import { FastifyReply, FastifyRequest } from "fastify";
import { UsecaseToken } from "@Shared/DI/Tokens/DITokens";
import ChatUseCase from "@AI/Application/Usecases/AIChat";
import { errorResponse, successResponse } from "@Shared/HTTP/ApiResponse";
import { HTTPError } from "@Shared/Errors/HTTPError";

@injectable()
class ChatController
{
    constructor(
        @inject(UsecaseToken.AI.SendMessage) private sendMessageUseCase: ChatUseCase
    ) { }

    async sendMessage(req: FastifyRequest<{ Querystring: { message: string } }>, res: FastifyReply)
    {
        try {
            const { message } = req.query

            const responseMessage = await this.sendMessageUseCase.execute(message)

            return res.status(200).send(successResponse(responseMessage))

        } catch (e) {
            if (e instanceof HTTPError) {
                return res.status(e.statusCode).send(errorResponse(e));
            }

            const unexpectedError = new HTTPError(
                500,
                'Unexpected error ocurred',
            );
            return res.status(500).send(errorResponse(unexpectedError));
        }
    }
}

export default ChatController