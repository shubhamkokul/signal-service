import { readline } from "./cli-util/readerUtil";
import { connectAsClient } from "./socket-connection/client";
import { establishServer } from "./socket-connection/server";



readline.question(`Please select an option [1] Server [2] Client? \n`, (option: string) => {
    if (option === `1`) {
        establishServer();
    } else if (option === `2`) {
        //"http://localhost:3000"
        readline.question(`Please enter the address \n`, (address: string) => {
            connectAsClient(address)
        });
    } else {
        console.log(`Please select correct option`);
    }
});