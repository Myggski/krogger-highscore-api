"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uuid_1 = require("uuid");
var UserDto = /** @class */ (function () {
    function UserDto(name) {
        this._id = (0, uuid_1.v4)();
        this._name = name;
        this._score = 0;
    }
    Object.defineProperty(UserDto.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserDto.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserDto.prototype, "score", {
        get: function () {
            return this._score;
        },
        enumerable: false,
        configurable: true
    });
    UserDto.prototype.setScore = function (score) {
        this._score = score;
    };
    return UserDto;
}());
exports.default = UserDto;
