"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * User-object for 'end users'
 */
class User {
    constructor(builder) {
        this.name = builder.name;
        this.score = builder.score;
    }
    get getName() {
        return this.name;
    }
    get getScore() {
        return this.score;
    }
}
exports.default = User;
