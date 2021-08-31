"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var apiError_1 = require("../core/apiError");
// TODO: Add real database, but which one?
var UserRepository = /** @class */ (function () {
    function UserRepository() {
        this._users = [];
    }
    /**
     * Creating a voice-user or a text-user
     * @param user - User
     */
    UserRepository.prototype.create = function (user) {
        var foundUser = this._users.find(function (r) { return r.name === user.name; });
        if (foundUser)
            throw new apiError_1.InternalError('User already exist');
        this._users.push(user);
        return user;
    };
    /**
     * Trying to find user by user id
     * @param id - The id of the user
     */
    UserRepository.prototype.findById = function (id) {
        var foundUser = this._users.find(function (r) { return r.id === id; });
        if (!foundUser)
            throw new apiError_1.NotFoundError('User does not exist');
        return foundUser;
    };
    /**
     * Finding a user, and removes it
     * @param id - User id
     */
    UserRepository.prototype.delete = function (id) {
        var index = this._users.findIndex(function (user) { return user.id === id; });
        if (index !== -1) {
            this._users.splice(index, 1);
        }
    };
    /**
     * Get all the users in array
     * Using Object.freeze for performance, and having a chance to use Readonly<T>
     */
    UserRepository.prototype.getList = function () {
        var clonedUsers = this._users.slice(0);
        return Object.freeze(clonedUsers);
    };
    UserRepository.prototype.setHighscore = function (id, score) {
        var userDto = this.findById(id);
        if (userDto.score >= score) {
            throw new apiError_1.ConflictError("Can only store highscore that's higher than previous highscore.");
        }
        userDto.setScore(score);
        return userDto;
    };
    return UserRepository;
}());
exports.default = UserRepository;
