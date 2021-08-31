"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("../config");
var app_1 = require("firebase/app");
exports.default = (0, app_1.initializeApp)(config_1.firebaseConfig);
