"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const http_1 = require("http");
class Server {
    constructor() {
        this.DEFAULT_PORT = 3000;
        this.initialize();
        this.handleRoutes();
        this.handleSocketConnection();
    }
    initialize() {
        this.app = (0, express_1.default)();
        this.httpServer = (0, http_1.createServer)(this.app);
        this.io = new socket_io_1.Server(this.httpServer);
    }
    handleRoutes() {
        this.app.get('/', (req, res) => {
            res.send('<h1>Welcome to P2P Chat</h1>');
        });
    }
    handleSocketConnection() {
        this.io.on('connection', socket => {
            console.log('Socket connected.');
        });
    }
    listen(callback) {
        this.httpServer.listen(this.DEFAULT_PORT, () => callback(this.DEFAULT_PORT));
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map