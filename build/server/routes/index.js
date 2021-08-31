"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const user_1 = (0, tslib_1.__importDefault)(require("./user"));
const router = (0, express_1.Router)();
/*-------------------------------*/
// Routes
/*-------------------------------*/
router.use('/user', user_1.default);
exports.default = router;
