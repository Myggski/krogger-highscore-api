"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const tslib_1 = require("tslib");
const body_parser_1 = (0, tslib_1.__importDefault)(require("body-parser"));
const path_1 = (0, tslib_1.__importDefault)(require("path"));
const cors_1 = (0, tslib_1.__importDefault)(require("cors"));
const express_1 = (0, tslib_1.__importDefault)(require("express"));
const handleRequests_1 = require("./middleware/handleRequests");
const http_1 = require("http");
const config_1 = require("./config");
const routes_1 = (0, tslib_1.__importDefault)(require("./routes"));
class Server {
    constructor() {
        this.PORT = Number.parseInt(config_1.port || '', 10) || 5000;
        this.initialize();
        this.handleRoutes();
    }
    initialize() {
        this.app = (0, express_1.default)();
        this.handleMiddleware();
        this.httpServer = (0, http_1.createServer)(this.app);
    }
    handleMiddleware() {
        this.app.use(body_parser_1.default.json({ limit: '10mb' }));
        this.app.use(body_parser_1.default.urlencoded({ extended: true, limit: '10mb', parameterLimit: 50000 }));
        this.app.use(express_1.default.static(path_1.default.join(__dirname, '../../app/dist/')));
        this.app.use((0, cors_1.default)({ origin: config_1.corsUrl, optionsSuccessStatus: 200 }));
    }
    handleRoutes() {
        // Static index file
        this.app.get("/", handleRequests_1.handleIndex);
        // Api-routes
        this.app.use('/api', routes_1.default);
        // Catch 404 and forward to error handler
        this.app.use(handleRequests_1.handlePageNotFound);
        // Catch errors
        this.app.use(handleRequests_1.handleError);
    }
    listen(callback) {
        this.httpServer.listen(this.PORT, () => callback(this.PORT));
    }
}
exports.Server = Server;
