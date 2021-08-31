import bodyParser from 'body-parser';
import path from 'path';
import cors from 'cors';
import express, { Application } from 'express';
import { handleError, handleIndex, handlePageNotFound } from './middleware/handleRequests';
import { createServer, Server as HTTPServer } from 'http';
import { port, corsUrl } from './config';
import routes from './routes';

/**
 * Initializing API
 */
export class Server {
    private httpServer: HTTPServer;
    private app: Application;
    PORT = Number.parseInt(port || '', 10) || 5000;

    constructor() {
        this.initialize();
        this.handleRoutes();
    }

    /**
     * Creating server
     * @private
     */
    private initialize(): void {
        this.app = express();
        this.handleMiddleware();

        this.httpServer = createServer(this.app);
    }

    /**
     * Setup middleware, to get static files and set cors
     * @private
     */
    private handleMiddleware(): void {
        this.app.use(bodyParser.json({ limit: '10mb' }));
        this.app.use(bodyParser.urlencoded({ extended: true, limit: '10mb', parameterLimit: 50000 }));
        this.app.use(express.static(path.join(__dirname, '../../app/dist/')));
        this.app.use(cors({ origin: corsUrl, optionsSuccessStatus: 200 }));
    }

    /**
     * Setup routes
     * @private
     */
    private handleRoutes(): void {
        // Static index file
        this.app.get("/", handleIndex);

        // Api-routes
        this.app.use('/api', routes);

        // Catch 404 and forward to error handler
        this.app.use(handlePageNotFound);

        // Catch errors
        this.app.use(handleError);
    }


    /**
     * Starts server
     * @param callback
     */
    public listen(callback: (port: number) => void): void {
        this.httpServer.listen(this.PORT, () =>
            callback(this.PORT));
    }
}