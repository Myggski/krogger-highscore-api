"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
var tslib_1 = require("tslib");
var body_parser_1 = (0, tslib_1.__importDefault)(require("body-parser"));
var path_1 = (0, tslib_1.__importDefault)(require("path"));
var cors_1 = (0, tslib_1.__importDefault)(require("cors"));
var express_1 = (0, tslib_1.__importDefault)(require("express"));
var handleRequests_1 = require("./middleware/handleRequests");
var http_1 = require("http");
var config_1 = require("./config");
var routes_1 = (0, tslib_1.__importDefault)(require("./routes"));
var Server = /** @class */ (function () {
    function Server() {
        this.PORT = Number.parseInt(config_1.port || '', 10) || 5000;
        this.initialize();
        this.handleRoutes();
    }
    Server.prototype.initialize = function () {
        this.app = (0, express_1.default)();
        this.handleMiddleware();
        this.httpServer = (0, http_1.createServer)(this.app);
    };
    Server.prototype.handleMiddleware = function () {
        this.app.use(body_parser_1.default.json({ limit: '10mb' }));
        this.app.use(body_parser_1.default.urlencoded({ extended: true, limit: '10mb', parameterLimit: 50000 }));
        this.app.use(express_1.default.static(path_1.default.join(__dirname, '../../app/dist/')));
        this.app.use((0, cors_1.default)({ origin: config_1.corsUrl, optionsSuccessStatus: 200 }));
    };
    Server.prototype.handleRoutes = function () {
        // Static index file
        this.app.get("/", handleRequests_1.handleIndex);
        // Api-routes
        this.app.use('/api', routes_1.default);
        // Catch 404 and forward to error handler
        this.app.use(handleRequests_1.handlePageNotFound);
        // Catch errors
        this.app.use(handleRequests_1.handleError);
    };
    Server.prototype.listen = function (callback) {
        var _this = this;
        this.httpServer.listen(this.PORT, function () {
            return callback(_this.PORT);
        });
    };
    return Server;
}());
exports.Server = Server;
