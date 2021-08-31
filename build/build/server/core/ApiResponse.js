"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalErrorResponse = exports.ConflictResponse = exports.NotFoundResponse = exports.BadRequestResponse = exports.SuccessNoContentResponse = exports.SuccessCreatedResponse = exports.SuccessResponse = exports.ApiResponse = void 0;
var tslib_1 = require("tslib");
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
var ApiResponse = /** @class */ (function () {
    function ApiResponse(statusCode, status, message) {
        this.statusCode = statusCode;
        this.status = status;
        this.message = message;
    }
    ApiResponse.prototype.prepare = function (res, response) {
        return res.status(this.status).json(ApiResponse.sanitize(response));
    };
    ApiResponse.prototype.send = function (res) {
        return this.prepare(res, this);
    };
    ApiResponse.classToJson = function (obj) {
        var jsonObj = Object.assign({}, obj);
        var proto = Object.getPrototypeOf(obj);
        for (var _i = 0, _a = Object.getOwnPropertyNames(proto); _i < _a.length; _i++) {
            var key = _a[_i];
            var desc = Object.getOwnPropertyDescriptor(proto, key);
            var hasGetter = desc && typeof desc.get === 'function';
            if (hasGetter) {
                jsonObj[key] = obj[key];
                delete jsonObj["_" + key];
            }
        }
        return jsonObj;
    };
    ApiResponse.sanitize = function (response) {
        if (response instanceof SuccessResponse) {
            var clone = Object.assign({}, response);
            if (Array.isArray(response.data)) {
                clone.data = clone.data.map(ApiResponse.classToJson);
            }
            else if (response.data === Object(response.data)) {
                clone.data = ApiResponse.classToJson(clone.data);
            }
            return clone;
        }
        return response;
    };
    return ApiResponse;
}());
exports.ApiResponse = ApiResponse;
/**
 * Response Code - 200
 */
var SuccessResponse = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(SuccessResponse, _super);
    function SuccessResponse(message, data) {
        var _this = _super.call(this, StatusCode.SUCCESS, ResponseStatus.SUCCESS, message) || this;
        _this.data = data;
        return _this;
    }
    SuccessResponse.prototype.send = function (res) {
        return this.prepare(res, this);
    };
    return SuccessResponse;
}(ApiResponse));
exports.SuccessResponse = SuccessResponse;
/**
 * Response Code - 201
 */
var SuccessCreatedResponse = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(SuccessCreatedResponse, _super);
    function SuccessCreatedResponse(message) {
        return _super.call(this, StatusCode.SUCCESS, ResponseStatus.CREATED, message) || this;
    }
    return SuccessCreatedResponse;
}(ApiResponse));
exports.SuccessCreatedResponse = SuccessCreatedResponse;
/**
 * Response Code 204
 */
var SuccessNoContentResponse = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(SuccessNoContentResponse, _super);
    function SuccessNoContentResponse(message) {
        return _super.call(this, StatusCode.SUCCESS, ResponseStatus.NO_CONTENT, message) || this;
    }
    return SuccessNoContentResponse;
}(ApiResponse));
exports.SuccessNoContentResponse = SuccessNoContentResponse;
/**
 * Response Code - 400
 */
var BadRequestResponse = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(BadRequestResponse, _super);
    function BadRequestResponse(message) {
        if (message === void 0) {
            message = 'Bad Parameters';
        }
        return _super.call(this, StatusCode.FAILURE, ResponseStatus.BAD_REQUEST, message) || this;
    }
    return BadRequestResponse;
}(ApiResponse));
exports.BadRequestResponse = BadRequestResponse;
/**
 * Response Code - 404
 */
var NotFoundResponse = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(NotFoundResponse, _super);
    function NotFoundResponse(message) {
        if (message === void 0) {
            message = 'Not Found';
        }
        return _super.call(this, StatusCode.FAILURE, ResponseStatus.NOT_FOUND, message) || this;
    }
    NotFoundResponse.prototype.send = function (res) {
        var _a;
        this.url = (_a = res.req) === null || _a === void 0 ? void 0 : _a.originalUrl;
        return _super.prototype.prepare.call(this, res, this);
    };
    return NotFoundResponse;
}(ApiResponse));
exports.NotFoundResponse = NotFoundResponse;
/**
 * Response Code - 409
 */
var ConflictResponse = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(ConflictResponse, _super);
    function ConflictResponse(message) {
        if (message === void 0) {
            message = 'Conflict';
        }
        return _super.call(this, StatusCode.FAILURE, ResponseStatus.CONFLICT, message) || this;
    }
    return ConflictResponse;
}(ApiResponse));
exports.ConflictResponse = ConflictResponse;
/**
 * Response Code - 500
 */
var InternalErrorResponse = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(InternalErrorResponse, _super);
    function InternalErrorResponse(message) {
        if (message === void 0) {
            message = 'Internal Error';
        }
        return _super.call(this, StatusCode.FAILURE, ResponseStatus.INTERNAL_ERROR, message) || this;
    }
    return InternalErrorResponse;
}(ApiResponse));
exports.InternalErrorResponse = InternalErrorResponse;
