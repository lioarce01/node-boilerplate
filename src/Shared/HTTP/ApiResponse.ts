import { HTTPError } from '@Shared/Errors/HTTPError';
import { HTTP_MESSAGES, HTTP_STATUS } from './StatusCode';

export interface ApiResponse<T = any>
{
  code: number;
  status: string;
  data?: T;
  error?: string;
  details?: any;
  totalCount?: number
}

export function successResponse<T>(data?: T): ApiResponse<T>
{
  return {
    code: HTTP_STATUS.SUCCESS,
    status: HTTP_MESSAGES[HTTP_STATUS.SUCCESS],
    data,
  };
}

export function errorResponse(error: HTTPError): ApiResponse
{
  return {
    code: error.statusCode,
    status: HTTP_MESSAGES[error.statusCode as keyof typeof HTTP_MESSAGES] || 'Unknown Error',
    error: error.message,
    details: error.details,
  };
}
