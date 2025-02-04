import { HTTP_STATUS } from '../HTTP/StatusCode';

export class HTTPError extends Error
{
  constructor(
    public statusCode: number,
    public message: string,
    public details?: any,
  )
  {
    super(message);
    this.name = 'HTTPError';
  }
}

// Specific error examples
export class NotFoundError extends HTTPError
{
  constructor(details?: any, message = 'Resource not found')
  {
    super(HTTP_STATUS.NOT_FOUND, details, message);
  }
}

export class NotAuthorizedError extends HTTPError
{
  constructor(details?: any, message = 'Unauthorized')
  {
    super(HTTP_STATUS.UNAUTHORIZED, details, message);
  }
}

export class ValidationError extends HTTPError
{
  constructor(details?: any, message = 'Invalid data')
  {
    super(HTTP_STATUS.BAD_REQUEST, details, message);
  }
}
