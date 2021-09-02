"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const apiError_1 = require("../core/apiError");
const UserDto_1 = (0, tslib_1.__importDefault)(require("../models/User/UserDto"));
const Store_1 = (0, tslib_1.__importDefault)(require("./Store"));
class UserRepository {
    constructor() {
        this.COLLECTION_NAME = 'users';
    }
    /**
     * Adding highscore to database
     * @param user - User
     */
    create(user) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            try {
                const userRef = yield Store_1.default.create(this.COLLECTION_NAME, Object.assign({}, user));
                const userData = yield userRef.get();
                return new UserDto_1.default(Object.assign({}, userData));
            }
            catch (error) {
                throw new apiError_1.InternalError("Something went wrong when trying to add highscore.");
            }
        });
    }
    /**
     * Get all highscores to list
     */
    getList() {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            try {
                const userRef = yield Store_1.default.getList(this.COLLECTION_NAME);
                return userRef.docs.map(doc => new UserDto_1.default(doc.data()));
            }
            catch (error) {
                throw new apiError_1.InternalError("Something went wrong when trying to get highscore.");
            }
        });
    }
}
exports.default = UserRepository;
