"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const http_1 = require("http");
const socketioJwt = require('socketio-jwt');
class Server {
    constructor() {
        this.DEFAULT_PORT = process.env.PORT || 3000;
        this.initialize();
        this.handleRoute();
        this.handleSocketConnection();
    }
    initialize() {
        this.app = (0, express_1.default)();
        this.httpServer = (0, http_1.createServer)(this.app);
        this.io = new socket_io_1.Server(this.httpServer);
        this.secret = process.env.SECRET || undefined;
    }
    handleRoute() {
        this.app.get('/', (req, res, next) => {
            res.send(`Welcome to Private Signalling Server`);
        });
    }
    handleSocketConnection() {
        if (this.secret) {
            this.io.use(socketioJwt.authorize({
                secret: this.secret,
                handshake: true
            }));
            this.io.on('connection', (socket) => {
                console.log('Client Connected');
            });
        }
    }
    listen(callback) {
        this.httpServer.listen(this.DEFAULT_PORT, () => callback(this.DEFAULT_PORT));
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map