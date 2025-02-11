const ChatSchema = {
    type: 'object',
    properties: {
        code: { type: 'number' },
        status: { type: 'string' },
        data: {
            type: 'object',
            properties: {
                message: { type: 'string' }
            },
            required: ['message']
        }
    },
    required: ['code', 'status', 'data']
};

const ChatRequestSchema = {
    type: 'object',
    properties: {
        message: { type: 'string' }
    },
    required: ['message']
};

const ChatResponseSchema = {
    description: 'Get message response from AI Model',
    tags: ['AIChat'],
    response: {
        200: ChatSchema
    }
}

export
{
    ChatResponseSchema,
    ChatRequestSchema
}