"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const dotenv_1 = (0, tslib_1.__importDefault)(require("dotenv"));
dotenv_1.default.config();
const server_1 = require("./server/");
new server_1.Server()
    .listen((port) => {
    console.log(`server running on port : ${port}`);
});
