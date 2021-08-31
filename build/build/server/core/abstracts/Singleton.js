"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This is where some magic happends.
 * It is a base-class for a singleton pattern with generic type and static properties.
 * Because of the static properties the abstract class must be wrapped around a function.
 * @returns A function for a singleton class to extend
 */
var SingletonFunc = function () {
    var Singleton = /** @class */ (function () {
        function Singleton() {
        }
        Object.defineProperty(Singleton, "instance", {
            get: function () {
                if (!Singleton._instance) {
                    Singleton._instance = new this();
                }
                return Singleton._instance;
            },
            enumerable: false,
            configurable: true
        });
        return Singleton;
    }());
    return Singleton;
};
exports.default = SingletonFunc;
