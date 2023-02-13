"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
/**
 * Client Connection
 */
const socket_io_client_1 = require("socket.io-client");
class Client {
    constructor(address) {
        this.handleSocketConnection(address);
    }
    handleSocketConnection(address) {
        this.clientSocket = (0, socket_io_client_1.io)(address, {
            reconnectionDelayMax: 10000,
            extraHeaders: {
                Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1vdW5pa2EiLCJpYXQiOjE2NzYyMzkzNDAsImV4cCI6MTY3ODgzMTM0MH0.xczru2wlw8Rse5pD1PAuMtrLt-5GAfhzTtcSXzxuwEU",
            }
        });
        this.clientSocket.on('connect', () => {
            console.log(`connected to ${address}`);
        });
        this.clientSocket.on('connect_error', error => {
            console.log(`error while connecting to ${address}`);
            console.log(`Error ${JSON.stringify(error)}`);
            this.clientSocket.disconnect();
        });
        this.clientSocket.on('message', message => {
            console.log('Server said - ', message);
        });
    }
}
exports.Client = Client;
//# sourceMappingURL=client.js.map