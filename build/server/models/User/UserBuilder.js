"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const User_1 = (0, tslib_1.__importDefault)(require("./User"));
class UserBuilder {
    get name() {
        return this._name;
    }
    get score() {
        return this._score;
    }
    setName(name) {
        this._name = name;
        return this;
    }
    setScore(score) {
        this._score = score;
        return this;
    }
    build() {
        return new User_1.default(this);
    }
}
exports.default = UserBuilder;
