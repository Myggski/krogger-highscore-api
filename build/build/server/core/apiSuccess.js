"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoContent = exports.Created = exports.Success = void 0;
var ApiResponse_1 = require("./ApiResponse");
var SuccessType;
(function (SuccessType) {
    SuccessType[SuccessType["OK"] = 0] = "OK";
    SuccessType[SuccessType["CREATED"] = 1] = "CREATED";
    SuccessType[SuccessType["NO_CONTENT"] = 2] = "NO_CONTENT";
})(SuccessType || (SuccessType = {}));
/**
 * Base custom api success response
 * TODO: Maybe make two ApiSuccess instead of that data is nullable.
 * One function where data is required, and one without data
 * @param type - What type of response to return
 * @param message - Message to return if needed
 * @param data - Example: If response is Created, return the created object
 */
var ApiSuccess = function (type, message, data) {
    if (message === void 0) {
        message = 'Success';
    }
    return ({
        send: function (res) {
            switch (type) {
                case SuccessType.CREATED:
                    return new ApiResponse_1.SuccessCreatedResponse(message).send(res);
                case SuccessType.NO_CONTENT:
                    return new ApiResponse_1.SuccessNoContentResponse(message).send(res);
                default: {
                    return new ApiResponse_1.SuccessResponse(message, data).send(res);
                }
            }
        },
    });
};
/**
 * Response code 200 - It went ok, nothing more, nothing less
 * Example: When in doubt and the request went well, use this
 * @param data - Object to return
 * @param message - Success message
 */
var Success = function (data, message) {
    if (message === void 0) {
        message = 'Response OK';
    }
    return ApiSuccess(SuccessType.OK, message, data);
};
exports.Success = Success;
/**
 * Response code 201 - Did I made that?
 * Example: When an entity is created
 * @param data - Created object
 * @param message - Success message
 */
var Created = function (data, message) {
    if (message === void 0) {
        message = 'Response OK - Created';
    }
    return ApiSuccess(SuccessType.CREATED, message, data);
};
exports.Created = Created;
/**
 * Response code 204
 * When the request went well, but the server has nothing to prove
 * Example: When an item is deleted, it has nothing to return, because it's deleted
 * @param message - Success message
 */
var NoContent = function (message) {
    if (message === void 0) {
        message = 'Response OK - No Content';
    }
    return ApiSuccess(SuccessType.NO_CONTENT, message);
};
exports.NoContent = NoContent;
