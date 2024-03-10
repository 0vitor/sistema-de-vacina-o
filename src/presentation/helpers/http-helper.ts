import { HttpError } from '../errors/http-error';
import { HttpResponse } from '../protocols/http-response';

export const badRequestError = (message: string[]): HttpResponse<HttpError> => {
  return { statusCode: 400, body: { message, error: 'bad request' } };
};

export const conflictError = (message: string[]): HttpResponse<HttpError> => {
  return { statusCode: 409, body: { message, error: 'conflict' } };
};
