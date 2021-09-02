"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const config_1 = require("../config");
const firebase_admin_1 = (0, tslib_1.__importDefault)(require("firebase-admin"));
/*-------------------------------*/
// Setting up the database
/*-------------------------------*/
const app = firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(config_1.firebaseConfig.serviceAccountKey),
    databaseURL: config_1.firebaseConfig.databaseURL,
});
const store = app.firestore();
const create = (collectionName, object) => {
    return store.collection(collectionName).add(object);
};
const getList = (collectionName) => {
    return store.collection(collectionName).get();
};
exports.default = {
    create,
    getList,
};
