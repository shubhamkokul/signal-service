import { Server, Socket } from "socket.io";
import { readline } from "../cli-util/readerUtil";
import { get } from 'http';

const PORT: number = parseInt(process.env.PORT || '3000', 10);
const serverIO = new Server();
let serverSocket: Socket;

export function establishServer() {
    
    serverIO.on("connection", (socket: Socket) => {
        serverSocket = socket;
        socket.on("message", function (message: string) {
            console.log("Client said: ", message);
            sendMessage();
        });
    });
    get({'host': 'api.ipify.org', 'port': 80, 'path': '/'}, function(resp) {
        resp.on('data', (ip) => {
            serverIO.listen(PORT);
            console.log(`Server Established at ${ip}`)
        });
      });
    
}

function sendMessage() {
    readline.question(`SendMessage:`, (message: string) => {
        serverSocket.emit("message", message);
    });
}