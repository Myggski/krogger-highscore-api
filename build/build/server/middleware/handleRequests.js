"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlePageNotFound = exports.handleError = exports.handleIndex = void 0;
var tslib_1 = require("tslib");
var path_1 = (0, tslib_1.__importDefault)(require("path"));
var config_1 = require("../config");
var apiError_1 = require("../core/apiError");
var handleIndex = function (req, res, next) {
    res.sendFile(path_1.default.join(__dirname, '../../app/dist/index.html'));
};
exports.handleIndex = handleIndex;
/**
 * If it's a custom made error, handle the error with care.
 * Otherwise we don't give a rats ass, don't spill the beans of what have happend to the client.
 * @param err - ApiError or Error
 * @param req - The Request
 * @param res - The Response
 * @param next - NextFunction
 */
var handleError = function (err, req, res, next) {
    if (err instanceof apiError_1.ApiError) {
        return apiError_1.ApiError.handle(err, res);
    }
    if (config_1.environment === 'development') {
        return res.status(500).send(err.message);
    }
    return apiError_1.ApiError.handle(new apiError_1.InternalError(), res);
};
exports.handleError = handleError;
/**
 * Page could not be found, pass it to the error handler with response status 404
 * @param req - The Request
 * @param res - The Response
 * @param next - NextFunction
 */
var handlePageNotFound = function (req, res, next) { return next(new apiError_1.NotFoundError()); };
exports.handlePageNotFound = handlePageNotFound;
