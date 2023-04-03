import { NextFunction, Request, Response, Router } from 'express';
import { ErrorResponse } from '../model/ErrorResponse';
import { TokenManagementService } from '../service/token-management/TokenManagementService';

export class TokenRoute {

    public router: Router;
    private tokenManagementService: TokenManagementService;

    constructor(tokenManagementService: TokenManagementService) {
        this.router = Router();
        this.tokenManagementService = tokenManagementService;
        this.routes();
    }

    private routes(): void {
        this.router.get('/', (req: Request, res: Response, next: NextFunction) => {
            res.send(`Welcome to Token Server`)
        })
        this.router.post('/generatetoken', (req: Request, res: Response, next: NextFunction) => {
            if (req.body.username) {
                try {
                    res.status(201).json({
                        APISUCCESS: true,
                        response: this.tokenManagementService.createTokenFromUserName(req.body.username)
                    });
                } catch (err) {
                    if (err instanceof Error) {
                        next(new ErrorResponse(err.name, err.message, 404));
                    }
                }
            } else {
                next(new ErrorResponse('INVALID_REQUEST', 'Please pass in the `username` in req body', 404));
            }
        });
        this.router.get('/validatetoken', (req: Request, res: Response, next: NextFunction) => {
            if (req.query && req.query.token) {
                res.status(200).json({
                    APISUCCESS: true,
                    response: this.tokenManagementService.verfiyToken(req.query.token as string, req.query.username as string)
                });
            } else {
                next(new ErrorResponse('INVALID_REQUEST', 'Please pass in the `token` to verify', 404))
            }
        })
        this.router.get('/gettokendata', (req: Request, res: Response, next: NextFunction) => {
            if (req.query && req.query.token) {
                res.status(200).json({
                    APISUCCESS: true,
                    response: this.tokenManagementService.getDataFromToken(req.query.token as string)
                });
            } else {
                next(new ErrorResponse('INVALID_REQUEST', 'Please pass in the `token` to verify', 404))
            }
        })
    }
}