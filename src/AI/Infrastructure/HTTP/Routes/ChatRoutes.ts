import { FastifyInstance, FastifyRequest } from "fastify";
import { container } from "tsyringe";
import ChatController from "../Controllers/ChatController";
import { ChatRequestSchema, ChatResponseSchema } from "@AI/Domain/Schemas/MessageSchema";


export default async function chatRoutes(fastify: FastifyInstance)
{
    const chatController = container.resolve(ChatController)

    fastify.get('/',
        {
            schema: {
                ...ChatResponseSchema,
                querystring: ChatRequestSchema,
            }
        },
        (req: any, res) =>
            chatController.sendMessage(req, res)
    )
}