import express, { Application } from 'express';
import { Server as SocketIOServer } from 'socket.io';
import { createServer, Server as HTTPServer } from 'http';
import { TokenManagement } from '../token-management/token';
import * as bodyParser from 'body-parser';
import { TokenRoute } from '../route/tokenRoutes';
import { ErrorResponse } from '../model/ErrorResponse';
import { ErrorHandler } from '../middleware/errorHandler';

export class Server {

    private httpServer: HTTPServer;
    private app: Application;
    private io: SocketIOServer;
    private secret: string | undefined;
    private tokenManagement: TokenManagement;

    private readonly DEFAULT_PORT: number | string = process.env.PORT || 3000;

    constructor() {
        this.initialize();
        this.handleRoute();
        this.handleSocketConnection();
    }

    private initialize(): void {
        this.app = express();
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.httpServer = createServer(this.app);
        this.io = new SocketIOServer(this.httpServer);
        this.secret = process.env.SECRET || '';
        this.tokenManagement = new TokenManagement(this.secret as string);
    }

    private handleRoute() {
        const tokenRoute = new TokenRoute(this.tokenManagement);
        const errorHandler = new ErrorHandler();
        this.app.use('/token', tokenRoute.router);
        // Error Handler
        this.app.use(errorHandler.errorHandler);
    }

    private handleSocketConnection(): void {
        if (this.secret) {
            this.io.use((socket, next) => {
                if (socket && socket.handshake.headers) {
                    const headers = socket.handshake.headers;
                    if (this.tokenManagement.verifyTokenForSocket(headers.token as string, headers.username as string)) {
                        next();
                    } else {
                        next(new ErrorResponse('UNAUTHORIZED_ACCESS', 'Unauthorized Token', 402));
                    }
                }
            });
            this.io.on('connection', (socket) => {
                console.log('Client Connected');
            });
        }
    }

    public listen(callback: (port: number) => void): void {
        this.httpServer.listen(this.DEFAULT_PORT, () =>
            callback(this.DEFAULT_PORT as number)
        );
    }
}