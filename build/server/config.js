"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.firebaseConfig = exports.port = exports.environment = exports.corsUrl = void 0;
exports.corsUrl = process.env.CORS_URL;
exports.environment = process.env.NODE_ENV;
exports.port = process.env.PORT;
exports.firebaseConfig = {
    databaseURL: process.env.DB_URL,
    serviceAccountKey: {
        projectId: process.env.DB_PROJECT_ID,
        privateKey: process.env.DB_PRIVATE_KEY,
        clientEmail: process.env.DB_CLIENT_EMAIL,
    },
};
