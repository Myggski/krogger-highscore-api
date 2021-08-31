import { Response } from 'express';
import { environment } from '../config';
import {
  InternalErrorResponse,
  NotFoundResponse,
  BadRequestResponse,
  ConflictResponse,
} from './ApiResponse';

export enum ErrorType {
  BAD_REQUEST = 'BadRequestError',
  CONFLICT = 'ConflictError',
  INTERNAL = 'InternalError',
  NOT_FOUND = 'NotFoundError',
};

/**
 * Base custom api error response
 */
export class ApiError extends Error {
  constructor(public type: ErrorType, public message: string = 'error') {
    super(message);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }

    Object.setPrototypeOf(this, new.target.prototype);
  }

  public static handle(err: ApiError, res: Response): Response {
    switch (err.type) {
      case ErrorType.INTERNAL:
        return new InternalErrorResponse(err.message).send(res);
      case ErrorType.NOT_FOUND:
        return new NotFoundResponse(err.message).send(res);
      case ErrorType.BAD_REQUEST:
        return new BadRequestResponse(err.message).send(res);
        case ErrorType.CONFLICT: 
        return new ConflictResponse(err.message).send(res);
      default: {
        let { message } = err;
        // Do not send failure message in production as it may send sensitive data
        if (environment === 'production') message = 'Something wrong happened.';
        return new InternalErrorResponse(message).send(res);
      }
    }
  }
};

/**
 * Response code 400 - Use this to blame the client
 * Example: When the uploaded file is too large, or a parameter is missing
 */
export class BadRequestError extends ApiError {
  constructor(message = 'Bad Request') {
    super(ErrorType.BAD_REQUEST, message);
  }
};

/**
 * Response code 404 - Use this when the entity/page could not be found
 * Example: Classic use is when the url does not exist
 */
export class NotFoundError extends ApiError {
  constructor(message = 'Not Found') {
    super(ErrorType.NOT_FOUND, message);
  }
};

/**
 * Response code 409 - Fear of conflict? Don't use this, or else
 * Example: When the data is correct, but the entity is locked by another user at the time
 */
export class ConflictError extends ApiError {
  constructor(message = 'Conflict') {
    super(ErrorType.CONFLICT, message);
  }
};

/**
 * Response code 500 - Use this to blame the server, or if there is no one to blame
 * Example: Database is down, or an unknown error occurs
 */
export class InternalError extends ApiError {
  constructor(message = 'Internal Error') {
    super(ErrorType.INTERNAL, message);
  }
};