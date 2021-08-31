"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const apiSuccess_1 = require("../core/apiSuccess");
const UserService_1 = (0, tslib_1.__importDefault)(require("../services/UserService"));
const asyncHandler_1 = (0, tslib_1.__importDefault)(require("../core/asyncHandler"));
const router = (0, express_1.Router)();
const service = new UserService_1.default();
/**
 * Get all users
 */
router.get('/', (0, asyncHandler_1.default)((req, res, next) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    const users = yield service.getList();
    return (0, apiSuccess_1.Success)(users).send(res);
})));
/**
 * Create user
 */
router.post('/', (0, asyncHandler_1.default)((req, res) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    var _a, _b;
    const user = yield service.create((_a = req.body) === null || _a === void 0 ? void 0 : _a.name, (_b = req.body) === null || _b === void 0 ? void 0 : _b.score);
    return (0, apiSuccess_1.Created)(user).send(res);
})));
exports.default = router;
