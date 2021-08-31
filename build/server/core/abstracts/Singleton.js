"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This is where some magic happends.
 * It is a base-class for a singleton pattern with generic type and static properties.
 * Because of the static properties the abstract class must be wrapped around a function.
 * @returns A function for a singleton class to extend
 */
const SingletonFunc = () => {
    class Singleton {
        static get instance() {
            if (!Singleton._instance) {
                Singleton._instance = new this();
            }
            return Singleton._instance;
        }
    }
    return Singleton;
};
exports.default = SingletonFunc;
