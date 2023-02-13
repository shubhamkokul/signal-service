"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const http_1 = require("http");
const token_1 = require("../token-management/token");
const bodyParser = __importStar(require("body-parser"));
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
        this.app.use(bodyParser.json());
        this.httpServer = (0, http_1.createServer)(this.app);
        this.io = new socket_io_1.Server(this.httpServer);
        this.secret = process.env.SECRET || '56b73824062dc759f0ff8c74999a6affd2f8932b1e15e2f2e919c7a62e2489ed';
        this.tokenManagement = new token_1.TokenManagement(this.secret);
    }
    handleRoute() {
        this.app.get('/', (req, res, next) => {
            res.send(`Welcome to Private Signalling Server`);
        });
        this.app.post('/generatetoken', (req, res, next) => {
            if (req.body.username) {
                res.send(this.tokenManagement.createTokenFromUserName(req.body.username));
            }
            else {
                res.send('Please pass in the `username` in req body');
            }
        });
        this.app.get('/validatetoken', (req, res, next) => {
            if (req.query && req.query.token) {
                res.send(this.tokenManagement.verfiyToken(req.query.token, req.query.username));
            }
            else {
                res.send('Please pass in the `token` to verify');
            }
        });
        this.app.get('/gettokendata', (req, res, next) => {
            if (req.query && req.query.token) {
                res.send(this.tokenManagement.getDataFromToken(req.query.token));
            }
            else {
                res.send('Please pass in the `token` to verify');
            }
        });
    }
    handleSocketConnection() {
        if (this.secret) {
            this.io.use((socket, next) => {
                if (socket) {
                    console.log(socket);
                    next();
                }
            });
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