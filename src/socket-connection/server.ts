import express, { Application } from 'express';
import { Server as SocketIOServer } from 'socket.io';
import { createServer, Server as HTTPServer } from 'http';
const socketioJwt = require('socketio-jwt');

export class Server {

    private httpServer: HTTPServer;
    private app: Application;
    private io: SocketIOServer;
    private secret: string | undefined;

    private readonly DEFAULT_PORT: number | string = process.env.PORT || 3000;

    constructor() {
        this.initialize();
        this.handleRoute();
        this.handleSocketConnection();
    }

    private initialize(): void {
        this.app = express();
        this.httpServer = createServer(this.app);
        this.io = new SocketIOServer(this.httpServer);
        this.secret = process.env.SECRET || undefined;
    }

    private handleRoute() {
        this.app.get('/', (req, res, next) => {
            res.send(`Welcome to Private Signalling Server`)
        })
    }

    private handleSocketConnection(): void {
        if(this.secret) {
            this.io.use(socketioJwt.authorize({
                secret: this.secret,
                handshake: true
            }));
            this.io.on('connection', (socket) => {
                console.log('Client Connected');
            });
        }
    }

    public listen(callback: (port: number | string) => void): void {
        this.httpServer.listen(this.DEFAULT_PORT, () =>
            callback(this.DEFAULT_PORT)
        );
    }
}