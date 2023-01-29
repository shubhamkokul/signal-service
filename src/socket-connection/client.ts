/**
 * Client Connection
*/
import { io, Socket } from "socket.io-client";
import { readline } from "../cli-util/readerUtil";


let clientSocket: Socket;

export function connectAsClient(address: string) {
    clientSocket = io(address, {
        reconnectionDelayMax: 10000,
    });
    clientSocket.on("connect", () => {
        console.log(`connected to ${address}`);
        sendMessage();
    });
    clientSocket.on("connect_error", (error) => {
        console.log(`error while connecting to ${address}`);
        console.log(`Error ${JSON.stringify(error)}`);
        clientSocket.disconnect();
    });
    clientSocket.on("message", function (message) {
        console.log("Server said: ", message);
        sendMessage();
    });

}

function sendMessage() {
    readline.question(`SendMessage:`, (message: string) => {
        clientSocket.emit("message", message);
    });
}


