"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const UserBuilder_1 = (0, tslib_1.__importDefault)(require("../models/User/UserBuilder"));
const UserDto_1 = (0, tslib_1.__importDefault)(require("../models/User/UserDto"));
const UserRepository_1 = (0, tslib_1.__importDefault)(require("../repositories/UserRepository"));
const apiError_1 = require("../core/apiError");
// TODO: Validate values better, and handle error better
class UserService {
    constructor() {
        this._nameRegExp = new RegExp('^\\w+$', 'g');
        this._repository = new UserRepository_1.default();
    }
    getList() {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const list = yield this._repository.getList();
            return list.map((userDto) => UserService.convertToUser(userDto));
        });
    }
    create(name, score) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const highscore = Number.parseInt(score.toString());
            if (!Number.isInteger(highscore)) {
                throw new apiError_1.BadRequestError(`Value ${score} is not a number`);
            }
            if (!name || name.length > 3 || !this._nameRegExp.test(name)) {
                throw new apiError_1.BadRequestError(`The name need to contain letters and digits (between 1-3 characters).`);
            }
            const user = yield this._repository.create(UserService.convertToUserDto(name, score));
            return UserService.convertToUser(user);
        });
    }
    static convertToUserDto(name, score) {
        return new UserDto_1.default({ name, score });
    }
    static convertToUser(userDto) {
        return new UserBuilder_1.default()
            .setName(userDto.getName)
            .setScore(userDto.getScore)
            .build();
    }
}
exports.default = UserService;