import { Request, Response, NextFunction } from "express";
import { ErrorResponse } from "../model/ErrorResponse";

export class ErrorHandler {

    public errorHandler(error: ErrorResponse, req: Request, res: Response, next: NextFunction) {
        res.status(error.status || 500).json({
            APISUCCESS: false,
            errorMessage: error.message,
            errorName: error.name
        });
    }
}