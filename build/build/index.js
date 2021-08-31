"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var dotenv_1 = (0, tslib_1.__importDefault)(require("dotenv"));
dotenv_1.default.config();
var server_1 = require("./server/");
new server_1.Server()
    .listen(function (port) {
    console.log("server running on port : " + port);
});
