import { Response, NextFunction } from "express";
import { ErrorResponse } from "../model/ErrorResponse";
import { CustomRequest } from "../model/CustomRequest";

export class ErrorHandler {

    public errorHandler(error: ErrorResponse, req: CustomRequest, res: Response, next: NextFunction) {
        res.status(error.status || 500).json({
            APISUCCESS: false,
            errorMessage: error.message,
            errorName: error.name
        });
    }
}