"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalError = exports.ConflictError = exports.NotFoundError = exports.BadRequestError = exports.ApiError = exports.ErrorType = void 0;
const config_1 = require("../config");
const ApiResponse_1 = require("./ApiResponse");
var ErrorType;
(function (ErrorType) {
    ErrorType["BAD_REQUEST"] = "BadRequestError";
    ErrorType["CONFLICT"] = "ConflictError";
    ErrorType["INTERNAL"] = "InternalError";
    ErrorType["NOT_FOUND"] = "NotFoundError";
})(ErrorType = exports.ErrorType || (exports.ErrorType = {}));
;
/**
 * Base custom api error response
 */
class ApiError extends Error {
    constructor(type, message = 'error') {
        super(message);
        this.type = type;
        this.message = message;
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ApiError);
        }
        Object.setPrototypeOf(this, new.target.prototype);
    }
    static handle(err, res) {
        switch (err.type) {
            case ErrorType.INTERNAL:
                return new ApiResponse_1.InternalErrorResponse(err.message).send(res);
            case ErrorType.NOT_FOUND:
                return new ApiResponse_1.NotFoundResponse(err.message).send(res);
            case ErrorType.BAD_REQUEST:
                return new ApiResponse_1.BadRequestResponse(err.message).send(res);
            case ErrorType.CONFLICT:
                return new ApiResponse_1.ConflictResponse(err.message).send(res);
            default: {
                let { message } = err;
                // Do not send failure message in production as it may send sensitive data
                if (config_1.environment === 'production')
                    message = 'Something wrong happened.';
                return new ApiResponse_1.InternalErrorResponse(message).send(res);
            }
        }
    }
}
exports.ApiError = ApiError;
;
/**
 * Response code 400 - Use this to blame the client
 * Example: When the uploaded file is too large, or a parameter is missing
 */
class BadRequestError extends ApiError {
    constructor(message = 'Bad Request') {
        super(ErrorType.BAD_REQUEST, message);
    }
}
exports.BadRequestError = BadRequestError;
;
/**
 * Response code 404 - Use this when the entity/page could not be found
 * Example: Classic use is when the url does not exist
 */
class NotFoundError extends ApiError {
    constructor(message = 'Not Found') {
        super(ErrorType.NOT_FOUND, message);
    }
}
exports.NotFoundError = NotFoundError;
;
/**
 * Response code 409 - Fear of conflict? Don't use this, or else
 * Example: When the data is correct, but the entity is locked by another user at the time
 */
class ConflictError extends ApiError {
    constructor(message = 'Conflict') {
        super(ErrorType.CONFLICT, message);
    }
}
exports.ConflictError = ConflictError;
;
/**
 * Response code 500 - Use this to blame the server, or if there is no one to blame
 * Example: Database is down, or an unknown error occurs
 */
class InternalError extends ApiError {
    constructor(message = 'Internal Error') {
        super(ErrorType.INTERNAL, message);
    }
}
exports.InternalError = InternalError;
;
