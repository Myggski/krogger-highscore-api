import { Response } from 'express';

// TODO: Update these to proper codes
enum StatusCode {
  SUCCESS = '10000',
  FAILURE = '10001',
}

/**
 * HTTP response codes that is in use
 *  TODO: Add response code 418
 */
enum ResponseStatus {
  SUCCESS = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  CONFLICT = 409,
  INTERNAL_ERROR = 500,
}

/**
 * Base class for custom API Responses
 */
export abstract class ApiResponse {
  constructor(
    protected statusCode: StatusCode,
    protected status: ResponseStatus,
    protected message: string,
  ) { }

  protected prepare<T extends ApiResponse>(res: Response, response: T): Response {
    return res.status(this.status).json(ApiResponse.sanitize(response));
  }

  public send(res: Response): Response {
    return this.prepare<ApiResponse>(res, this);
  }

  private static classToJson(obj: any): any {
    const jsonObj = Object.assign({} as any, obj);
    const proto = Object.getPrototypeOf(obj);
    for (const key of Object.getOwnPropertyNames(proto)) {
      const desc = Object.getOwnPropertyDescriptor(proto, key);
      const hasGetter = desc && typeof desc.get === 'function';
      if (hasGetter) {
        jsonObj[key] = obj[key];
        delete jsonObj[`_${key}`]
      }
    }
    return jsonObj;
  }

  private static sanitize<T extends ApiResponse>(response: T): T {
    if (response instanceof SuccessResponse) {
      const clone = Object.assign({}, response);

      if (Array.isArray(response.data)) {
        clone.data = clone.data.map(ApiResponse.classToJson);
      } else if (response.data === Object(response.data)) {
        clone.data = ApiResponse.classToJson(clone.data);
      }

      return clone;
    }

    return response;
  }
}

/**
 * Response Code - 200
 */
export class SuccessResponse<T> extends ApiResponse {
  constructor(message: string, public data: T[] | T) {
    super(StatusCode.SUCCESS, ResponseStatus.SUCCESS, message);
  }

  send(res: Response): Response {
    return this.prepare<SuccessResponse<T>>(res, this);
  }
}

/**
 * Response Code - 201
 */
export class SuccessCreatedResponse<T> extends ApiResponse {
  constructor(message: string) {
    super(StatusCode.SUCCESS, ResponseStatus.CREATED, message);
  }
}

/**
 * Response Code 204
 */
export class SuccessNoContentResponse<T> extends ApiResponse {
  constructor(message: string) {
    super(StatusCode.SUCCESS, ResponseStatus.NO_CONTENT, message);
  }
}

/**
 * Response Code - 400
 */
export class BadRequestResponse extends ApiResponse {
  constructor(message = 'Bad Parameters') {
    super(StatusCode.FAILURE, ResponseStatus.BAD_REQUEST, message);
  }
}

/**
 * Response Code - 404
 */
export class NotFoundResponse extends ApiResponse {
  private url: string | undefined;

  constructor(message = 'Not Found') {
    super(StatusCode.FAILURE, ResponseStatus.NOT_FOUND, message);
  }

  send(res: Response): Response {
    this.url = res.req?.originalUrl;
    return super.prepare<NotFoundResponse>(res, this);
  }
}

/**
 * Response Code - 409
 */
export class ConflictResponse extends ApiResponse {
  constructor(message = 'Conflict') {
    super(StatusCode.FAILURE, ResponseStatus.CONFLICT, message);
  }
}

/**
 * Response Code - 500
 */
export class InternalErrorResponse extends ApiResponse {
  constructor(message = 'Internal Error') {
    super(StatusCode.FAILURE, ResponseStatus.INTERNAL_ERROR, message);
  }
}