import { HTTP_STATUS } from "../HTTP/StatusCode";

export class HTTPError extends Error
{
    constructor(
        public statusCode: number,
        public message: string,
        public details?: any
    )
    {
        super(message);
        this.name = "HTTPError";
    }
}

// Ejemplos de errores específicos
export class NotFoundError extends HTTPError
{
    constructor(message = "Resource not found", details?: any)
    {
        super(HTTP_STATUS.NOT_FOUND, message, details);
    }
}

export class ValidationError extends HTTPError
{
    constructor(message = "Invalid data", details?: any)
    {
        super(HTTP_STATUS.BAD_REQUEST, message, details);
    }
}