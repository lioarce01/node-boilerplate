
const UserResponseSchema = {
    type: 'object',
    properties: {
        code: { type: 'number' },
        status: { type: 'string' },
        data: {
            type: 'object',
            properties: {
                id: { type: 'string' },
                sub: { type: 'string' },
                name: { type: 'string' },
                email: { type: 'string', format: 'email' },
                picture: { type: 'string' },
                createdAt: { type: 'string' },
                updatedAt: { type: 'string' }
            },
            required: ['id', 'sub', 'name', 'email', 'picture']
        }
    },
    required: ['code', 'status', 'data']
};

const UserArrayResponseSchema = {
    type: 'object',
    properties: {
        code: { type: 'number' },
        status: { type: 'string' },
        data: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: { type: 'string' },
                    sub: { type: 'string' },
                    name: { type: 'string' },
                    email: { type: 'string', format: 'email' },
                    picture: { type: 'string' },
                    createdAt: { type: 'string' },
                    updatedAt: { type: 'string' }
                },
                required: ['id', 'sub', 'name', 'email', 'picture']
            }
        }
    },
    required: ['code', 'status', 'data']
};

const CreateUserSchema = {
    description: 'Create a new user',
    tags: ['User'],
    response: {
        200: UserResponseSchema
    }
};

const ListUsersSchema = {
    description: 'List all users',
    tags: ['User'],
    response: {
        200: UserArrayResponseSchema
    }
};

const GetMeSchema = {
    description: "Get the authenticated user's details",
    tags: ['User'],
    response: {
        200: UserResponseSchema
    }
};

const UpdateUserSchema = {
    description: 'Update a user',
    tags: ['User'],
    body: {
        type: 'object',
        properties: {
            name: { type: 'string' },
            email: { type: 'string', format: 'email' },
            picture: { type: 'string' },
            createdAt: { type: 'string' },
            updatedAt: { type: 'string' }
        }
    },
    response: {
        200: UserResponseSchema
    }
};

const DeleteUserSchema = {
    description: 'Delete a user',
    tags: ['User'],
    response: {
        200: {
            type: 'object',
            properties: {
                code: { type: 'number' },
                status: { type: 'string' },
                data: { type: 'string' }
            },
            required: ['code', 'status', 'data']
        }
    }
};

const GetUserByIdSchema = {
    description: 'Get a user by identifier',
    tags: ['User'],
    params: {
        type: 'object',
        properties: {
            identifier: { type: 'string', description: 'User ID or User Sub (auth0 ID)' }
        },
        required: ['identifier']
    },
    response: {
        200: UserResponseSchema
    }
};

export
{
    CreateUserSchema,
    ListUsersSchema,
    GetMeSchema,
    UpdateUserSchema,
    DeleteUserSchema,
    GetUserByIdSchema
};
