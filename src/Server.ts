import express, { Application } from 'express';
import { Server as SocketIOServer } from 'socket.io';
import { createServer, Server as HTTPServer } from 'http';
import * as bodyParser from 'body-parser';
import { TokenManagementService } from './lib/service/token-management/TokenManagementService';
import { OpenAIService } from './lib/service/open-ai/OpenAIService';
import { TokenRoute } from './lib/route/TokenRoute';
import { OpenAIRoute } from './lib/route/OpenAIRoute';
import { ErrorHandler } from './lib/middleware/ErrorHandler';
import { SocketConnectionService } from './lib/service/socket-connection/SocketConnectionService';
import { ConnectService } from './lib/service/ConnectService';
import { SocketConnectRoute } from './lib/route/SocketConnectRoute';

//Todo: Refactor this to only handle socket connection and move the middleware to separate file
export class Server {

    private httpServer: HTTPServer;
    private app: Application;
    private io: SocketIOServer;
    private secret: string | undefined;
    private apiKey: string | undefined;
    private orgKey: string | undefined;
    private connectService: ConnectService;
    private tokenManagementService: TokenManagementService;
    private socketConnectionService: SocketConnectionService;
    private openAIService: OpenAIService;

    private readonly DEFAULT_PORT: number | string = process.env.PORT || 3000;

    constructor() {
        this.initialize();
        this.initializeObjects();
        this.handleRoute();
    }

    private initialize(): void {
        this.app = express();
        this.app.use(bodyParser.json());
        this.secret = process.env.SECRET || '';
        this.apiKey = process.env.API_KEY || '';
        this.orgKey = process.env.ORG_KEY || '';
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.httpServer = createServer(this.app);
    }

    private initializeObjects(): void {
        this.io = new SocketIOServer(this.httpServer);
        this.connectService = new ConnectService(this.apiKey as string, this.orgKey as string);
        this.openAIService = new OpenAIService(this.connectService.getOpenAIAPIClient());
        this.tokenManagementService = new TokenManagementService(this.secret as string);
        this.socketConnectionService = new SocketConnectionService(this.io, this.tokenManagementService, this.secret);
    }

    private handleRoute() {
        const tokenRoute = new TokenRoute(this.tokenManagementService);
        const openAIRoute = new OpenAIRoute(this.openAIService);
        const socketConnectRoute = new SocketConnectRoute(this.socketConnectionService);
        const errorHandler = new ErrorHandler();
        this.app.use('/token', tokenRoute.router);
        this.app.use('/openai', openAIRoute.router)
        this.app.use('/socket-connect', socketConnectRoute.router)
        // Error Handler
        this.app.use(errorHandler.errorHandler);
    }

    public listen(callback: (port: number) => void): void {
        this.httpServer.listen(this.DEFAULT_PORT, () =>
            callback(this.DEFAULT_PORT as number)
        );
    }
}