"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalError = exports.ConflictError = exports.NotFoundError = exports.BadRequestError = exports.ApiError = exports.ErrorType = void 0;
var tslib_1 = require("tslib");
var config_1 = require("../config");
var ApiResponse_1 = require("./ApiResponse");
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
var ApiError = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(ApiError, _super);
    function ApiError(type, message) {
        var _newTarget = this.constructor;
        if (message === void 0) {
            message = 'error';
        }
        var _this = _super.call(this, message) || this;
        _this.type = type;
        _this.message = message;
        if (Error.captureStackTrace) {
            Error.captureStackTrace(_this, ApiError);
        }
        Object.setPrototypeOf(_this, _newTarget.prototype);
        return _this;
    }
    ApiError.handle = function (err, res) {
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
                var message = err.message;
                // Do not send failure message in production as it may send sensitive data
                if (config_1.environment === 'production')
                    message = 'Something wrong happened.';
                return new ApiResponse_1.InternalErrorResponse(message).send(res);
            }
        }
    };
    return ApiError;
}(Error));
exports.ApiError = ApiError;
;
/**
 * Response code 400 - Use this to blame the client
 * Example: When the uploaded file is too large, or a parameter is missing
 */
var BadRequestError = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(BadRequestError, _super);
    function BadRequestError(message) {
        if (message === void 0) {
            message = 'Bad Request';
        }
        return _super.call(this, ErrorType.BAD_REQUEST, message) || this;
    }
    return BadRequestError;
}(ApiError));
exports.BadRequestError = BadRequestError;
;
/**
 * Response code 404 - Use this when the entity/page could not be found
 * Example: Classic use is when the url does not exist
 */
var NotFoundError = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(NotFoundError, _super);
    function NotFoundError(message) {
        if (message === void 0) {
            message = 'Not Found';
        }
        return _super.call(this, ErrorType.NOT_FOUND, message) || this;
    }
    return NotFoundError;
}(ApiError));
exports.NotFoundError = NotFoundError;
;
/**
 * Response code 409 - Fear of conflict? Don't use this, or else
 * Example: When the data is correct, but the entity is locked by another user at the time
 */
var ConflictError = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(ConflictError, _super);
    function ConflictError(message) {
        if (message === void 0) {
            message = 'Conflict';
        }
        return _super.call(this, ErrorType.CONFLICT, message) || this;
    }
    return ConflictError;
}(ApiError));
exports.ConflictError = ConflictError;
;
/**
 * Response code 500 - Use this to blame the server, or if there is no one to blame
 * Example: Database is down, or an unknown error occurs
 */
var InternalError = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(InternalError, _super);
    function InternalError(message) {
        if (message === void 0) {
            message = 'Internal Error';
        }
        return _super.call(this, ErrorType.INTERNAL, message) || this;
    }
    return InternalError;
}(ApiError));
exports.InternalError = InternalError;
;
