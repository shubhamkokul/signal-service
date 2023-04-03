import { NextFunction, Request, Response, Router } from "express";
import { SocketConnectionService } from "../service/socket-connection/SocketConnectionService";

export class SocketConnectRoute {
    public router: Router;
    private socketConnectionService: SocketConnectionService;

    constructor(socketConnectionService: SocketConnectionService) {
        this.router = Router();
        this.socketConnectionService = socketConnectionService;
        this.routes();
    }

    private routes(): void {
        this.router.get('/', (req: Request, res: Response, next: NextFunction) => {
            res.send(`Welcome to Socket Server`)
        })
        this.router.get('/connect', (req: Request, res: Response, next: NextFunction) => {
            this.socketConnectionService.handleSocketConnection();
            res.status(200).json({
                APISUCCESS: true,
                response: "Socket Connected"
            })
        })
    }
}