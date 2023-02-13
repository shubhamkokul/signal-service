"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("./lib/socket-connection/client");
const server_1 = require("./lib/socket-connection/server");
const server = new server_1.Server();
const client = new client_1.Client('http://localhost:3000');
server.listen(port => {
    console.log(`Server is listening on http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map