"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Handles async methods
 * @param execution
 */
exports.default = (execution) => (req, res, next) => {
    execution(req, res, next).catch(next);
};
