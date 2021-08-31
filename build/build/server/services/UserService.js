"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var UserBuilder_1 = (0, tslib_1.__importDefault)(require("../models/User/UserBuilder"));
var UserDto_1 = (0, tslib_1.__importDefault)(require("../models/User/UserDto"));
var UserRepository_1 = (0, tslib_1.__importDefault)(require("../repositories/UserRepository"));
// TODO: Validate values better, and handle error better
var UserService = /** @class */ (function () {
    function UserService() {
        this._repository = new UserRepository_1.default();
    }
    UserService.prototype.getList = function () {
        return this._repository.getList().map(UserService.convertToUser);
    };
    UserService.prototype.findById = function (id) {
        return UserService.convertToUser(this._repository.findById(id));
    };
    UserService.prototype.create = function (entity) {
        return UserService.convertToUser(this._repository.create(UserService.convertToUserDto(entity)));
    };
    UserService.prototype.delete = function (id) {
        this._repository.delete(id);
    };
    UserService.prototype.setHighscore = function (id, score) {
        return UserService.convertToUser(this._repository.setHighscore(id, score));
    };
    UserService.convertToUserDto = function (user) {
        return new UserDto_1.default(user.name);
    };
    UserService.convertToUser = function (userDto) {
        return new UserBuilder_1.default()
            .setId(userDto.id)
            .setName(userDto.name)
            .setScore(userDto.score)
            .build();
    };
    return UserService;
}());
exports.default = UserService;
