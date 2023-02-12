"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectAsClient = void 0;
/**
 * Client Connection
 */
const socket_io_client_1 = require("socket.io-client");
const readerUtil_1 = require("../cli-util/readerUtil");
let clientSocket;
function connectAsClient(address) {
    clientSocket = (0, socket_io_client_1.io)(address, {
        reconnectionDelayMax: 10000,
    });
    clientSocket.on('connect', () => {
        console.log(`connected to ${address}`);
        sendMessage();
    });
    clientSocket.on('connect_error', error => {
        console.log(`error while connecting to ${address}`);
        console.log(`Error ${JSON.stringify(error)}`);
        clientSocket.disconnect();
    });
    clientSocket.on('message', message => {
        console.log('Server said: ', message);
        sendMessage();
    });
}
exports.connectAsClient = connectAsClient;
function sendMessage() {
    readerUtil_1.readline.question('SendMessage:', (message) => {
        clientSocket.emit('message', message);
    });
}
//# sourceMappingURL=client.js.map