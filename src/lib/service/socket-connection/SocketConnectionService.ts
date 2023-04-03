import { ErrorResponse } from '../../model/ErrorResponse';
import { Server as SocketIOServer } from 'socket.io';
import { TokenManagementService } from '../token-management/TokenManagementService';

export class SocketConnectionService {

    private io: SocketIOServer;
    private tokenManagementService: TokenManagementService;
    private secret: string | undefined;

    constructor(io: SocketIOServer, tokenManagementService: TokenManagementService, secret: string | undefined) {
        this.io = io;
        this.tokenManagementService = tokenManagementService;
        this.secret = secret;
    }

    public handleSocketConnection(): void {
        if (this.secret) {
            this.io.use((socket, next) => {
                if (socket && socket.handshake.headers) {
                    const headers = socket.handshake.headers;
                    if (this.tokenManagementService.verifyTokenForSocket(headers.token as string, headers.username as string)) {
                        next();
                    } else {
                        next(new ErrorResponse('UNAUTHORIZED_ACCESS', 'Unauthorized Token', 402));
                    }
                }
            });
            this.io.on('connection', (socket) => {
                console.log('Client Connected');
            });
        }
    }
}