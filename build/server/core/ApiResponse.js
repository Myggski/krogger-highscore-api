"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalErrorResponse = exports.ConflictResponse = exports.NotFoundResponse = exports.BadRequestResponse = exports.SuccessNoContentResponse = exports.SuccessCreatedResponse = exports.SuccessResponse = exports.ApiResponse = void 0;
// TODO: Update these to proper codes
var StatusCode;
(function (StatusCode) {
    StatusCode["SUCCESS"] = "10000";
    StatusCode["FAILURE"] = "10001";
})(StatusCode || (StatusCode = {}));
/**
 * HTTP response codes that is in use
 *  TODO: Add response code 418
 */
var ResponseStatus;
(function (ResponseStatus) {
    ResponseStatus[ResponseStatus["SUCCESS"] = 200] = "SUCCESS";
    ResponseStatus[ResponseStatus["CREATED"] = 201] = "CREATED";
    ResponseStatus[ResponseStatus["NO_CONTENT"] = 204] = "NO_CONTENT";
    ResponseStatus[ResponseStatus["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    ResponseStatus[ResponseStatus["NOT_FOUND"] = 404] = "NOT_FOUND";
    ResponseStatus[ResponseStatus["CONFLICT"] = 409] = "CONFLICT";
    ResponseStatus[ResponseStatus["INTERNAL_ERROR"] = 500] = "INTERNAL_ERROR";
})(ResponseStatus || (ResponseStatus = {}));
/**
 * Base class for custom API Responses
 */
class ApiResponse {
    constructor(statusCode, status, message) {
        this.statusCode = statusCode;
        this.status = status;
        this.message = message;
    }
    prepare(res, response) {
        return res.status(this.status).json(ApiResponse.sanitize(response));
    }
    send(res) {
        return this.prepare(res, this);
    }
    static classToJson(obj) {
        const jsonObj = Object.assign({}, obj);
        const proto = Object.getPrototypeOf(obj);
        for (const key of Object.getOwnPropertyNames(proto)) {
            const desc = Object.getOwnPropertyDescriptor(proto, key);
            const hasGetter = desc && typeof desc.get === 'function';
            if (hasGetter) {
                jsonObj[key] = obj[key];
                delete jsonObj[`_${key}`];
            }
        }
        return jsonObj;
    }
    static sanitize(response) {
        if (response instanceof SuccessResponse) {
            const clone = Object.assign({}, response);
            if (Array.isArray(response.data)) {
                clone.data = clone.data.map(ApiResponse.classToJson);
            }
            else if (response.data === Object(response.data)) {
                clone.data = ApiResponse.classToJson(clone.data);
            }
            return clone;
        }
        return response;
    }
}
exports.ApiResponse = ApiResponse;
/**
 * Response Code - 200
 */
class SuccessResponse extends ApiResponse {
    constructor(message, data) {
        super(StatusCode.SUCCESS, ResponseStatus.SUCCESS, message);
        this.data = data;
    }
    send(res) {
        return this.prepare(res, this);
    }
}
exports.SuccessResponse = SuccessResponse;
/**
 * Response Code - 201
 */
class SuccessCreatedResponse extends ApiResponse {
    constructor(message) {
        super(StatusCode.SUCCESS, ResponseStatus.CREATED, message);
    }
}
exports.SuccessCreatedResponse = SuccessCreatedResponse;
/**
 * Response Code 204
 */
class SuccessNoContentResponse extends ApiResponse {
    constructor(message) {
        super(StatusCode.SUCCESS, ResponseStatus.NO_CONTENT, message);
    }
}
exports.SuccessNoContentResponse = SuccessNoContentResponse;
/**
 * Response Code - 400
 */
class BadRequestResponse extends ApiResponse {
    constructor(message = 'Bad Parameters') {
        super(StatusCode.FAILURE, ResponseStatus.BAD_REQUEST, message);
    }
}
exports.BadRequestResponse = BadRequestResponse;
/**
 * Response Code - 404
 */
class NotFoundResponse extends ApiResponse {
    constructor(message = 'Not Found') {
        super(StatusCode.FAILURE, ResponseStatus.NOT_FOUND, message);
    }
    send(res) {
        var _a;
        this.url = (_a = res.req) === null || _a === void 0 ? void 0 : _a.originalUrl;
        return super.prepare(res, this);
    }
}
exports.NotFoundResponse = NotFoundResponse;
/**
 * Response Code - 409
 */
class ConflictResponse extends ApiResponse {
    constructor(message = 'Conflict') {
        super(StatusCode.FAILURE, ResponseStatus.CONFLICT, message);
    }
}
exports.ConflictResponse = ConflictResponse;
/**
 * Response Code - 500
 */
class InternalErrorResponse extends ApiResponse {
    constructor(message = 'Internal Error') {
        super(StatusCode.FAILURE, ResponseStatus.INTERNAL_ERROR, message);
    }
}
exports.InternalErrorResponse = InternalErrorResponse;
