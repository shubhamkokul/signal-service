import { NextFunction, Response } from "express";
import { TokenManagementService } from "../service/token-management/TokenManagementService";
import { CustomRequest } from "../model/CustomRequest";
import { AuthState } from "../model/AuthState";

export class AuthHandler {

    public authenticate(tokenManagementService: TokenManagementService) {

        return (req: CustomRequest, res: Response, next: NextFunction) => {
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];
            const username = req.localCache.username;
            try {
                if (token && username && tokenManagementService.verfiyToken(token as string, username as string)) {
                    req.localCache.authState = AuthState.AUTHENTICATED.toString();
                    req.localCache.token = token;
                } else {
                    req.localCache.authState = AuthState.UNAUTHENTICATED.toString();
                }
            } catch (err) {
                console.log(err);
            }
            return next();
        }
    }

}