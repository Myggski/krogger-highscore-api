"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var express_1 = require("express");
var apiSuccess_1 = require("../core/apiSuccess");
var UserService_1 = (0, tslib_1.__importDefault)(require("../services/UserService"));
var router = (0, express_1.Router)();
var service = new UserService_1.default();
/**
 * Get all users
 */
router.get('/', function (req, res, next) {
    var users = service.getList();
    return (0, apiSuccess_1.Success)(users).send(res);
});
/**
 * Get user by id
 */
router.get('/:id', function (req, res, next) {
    var user = service.findById(req.params.id);
    return (0, apiSuccess_1.Success)(user).send(res);
});
/**
 * Remove user by id
 */
router.delete('/:id', function (req, res, next) {
    var id = req.params.id;
    service.delete(id);
    return (0, apiSuccess_1.NoContent)("User is deleted").send(res);
});
/**
 * Create user
 */
router.post('/', function (req, res) {
    var _a;
    var user = service.create((_a = req.body) === null || _a === void 0 ? void 0 : _a.name);
    return (0, apiSuccess_1.Created)(user).send(res);
});
/**
 * Sets highscore of user
 */
router.put('/:id/score', function (req, res) {
    var _a, _b;
    var user = service.setHighscore((_a = req.params) === null || _a === void 0 ? void 0 : _a.id, (_b = req.body) === null || _b === void 0 ? void 0 : _b.score);
    return (0, apiSuccess_1.Success)(user).send(res);
});
exports.default = router;
