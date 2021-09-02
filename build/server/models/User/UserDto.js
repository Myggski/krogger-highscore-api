"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Database class
 */
class UserDto {
    constructor(args) {
        this.name = (args === null || args === void 0 ? void 0 : args.name) || '';
        this.score = (args === null || args === void 0 ? void 0 : args.score) || '';
    }
    get getName() {
        return this.name;
    }
    get getScore() {
        return this.score;
    }
}
exports.default = UserDto;
