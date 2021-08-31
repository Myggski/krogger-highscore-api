"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var User_1 = (0, tslib_1.__importDefault)(require("./User"));
var UserBuilder = /** @class */ (function () {
    function UserBuilder() {
    }
    Object.defineProperty(UserBuilder.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserBuilder.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserBuilder.prototype, "score", {
        get: function () {
            return this._score;
        },
        enumerable: false,
        configurable: true
    });
    UserBuilder.prototype.setId = function (id) {
        this._id = id;
        return this;
    };
    UserBuilder.prototype.setName = function (name) {
        this._name = name;
        return this;
    };
    UserBuilder.prototype.setScore = function (score) {
        this._score = score;
        return this;
    };
    UserBuilder.prototype.build = function () {
        return new User_1.default(this);
    };
    return UserBuilder;
}());
exports.default = UserBuilder;
