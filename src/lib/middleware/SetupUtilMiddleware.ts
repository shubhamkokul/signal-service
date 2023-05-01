import { NextFunction, Response } from "express";
import { CustomRequest } from "../model/CustomRequest";

export class SetupUtilMiddlewares {

    public setupLocalCacheInReqObject(req: CustomRequest, res: Response, next: NextFunction) {
        req.localCache = {};
        next();
    }

    public setupUsernameInLocalCache(req: CustomRequest, res: Response, next: NextFunction) {
        const username: string = req.query && req.query.username || req.body && req.body.username || req.params.username || req.headers['username'] || '';
        req.localCache.username = username;
        next();
    }
}
