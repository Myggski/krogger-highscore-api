"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var express_1 = require("express");
var user_1 = (0, tslib_1.__importDefault)(require("./user"));
var router = (0, express_1.Router)();
/*-------------------------------*/
// Routes
/*-------------------------------*/
router.use('/user', user_1.default);
exports.default = router;
