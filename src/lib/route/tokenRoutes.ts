import { NextFunction, Request, Response, Router } from 'express';
import { ErrorResponse } from '../model/ErrorResponse';
import { TokenManagement } from '../token-management/token';

export class TokenRoute {

    public router: Router;
    private tokenManagement: TokenManagement

    constructor(tokenManagement: TokenManagement) {
        this.router = Router();
        this.tokenManagement = tokenManagement;
        this.routes();
    }

    private routes(): void {
        this.router.get('/', (req: Request, res: Response, next: NextFunction) => {
            res.send(`Welcome to Private Signalling Server`)
        })
        this.router.post('/generatetoken', (req: Request, res: Response, next: NextFunction) => {
            if (req.body.username) {
                try {
                    res.status(201).json({
                        APISUCCESS: true,
                        response: this.tokenManagement.createTokenFromUserName(req.body.username)
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
                    response: this.tokenManagement.verfiyToken(req.query.token as string, req.query.username as string)
                });
            } else {
                next(new ErrorResponse('INVALID_REQUEST', 'Please pass in the `token` to verify', 404))
            }
        })
        this.router.get('/gettokendata', (req: Request, res: Response, next: NextFunction) => {
            if (req.query && req.query.token) {
                res.status(200).json({
                    APISUCCESS: true,
                    response: this.tokenManagement.getDataFromToken(req.query.token as string)
                });
            } else {
                next(new ErrorResponse('INVALID_REQUEST', 'Please pass in the `token` to verify', 404))
            }
        })
    }
}