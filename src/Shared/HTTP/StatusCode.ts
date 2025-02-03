export const HTTP_STATUS = {
    SUCCESS: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    INTERNAL_ERROR: 500,
} as const;

export const HTTP_MESSAGES = {
    [HTTP_STATUS.SUCCESS]: "Success",
    [HTTP_STATUS.CREATED]: "Created",
    [HTTP_STATUS.BAD_REQUEST]: "Bad Request",
    [HTTP_STATUS.UNAUTHORIZED]: "Unauthorized",
    [HTTP_STATUS.NOT_FOUND]: "Not Found",
    [HTTP_STATUS.INTERNAL_ERROR]: "Internal Server Error",
} as const;