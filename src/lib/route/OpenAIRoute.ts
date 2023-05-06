import { NextFunction, Response, Router } from "express";
import { CreateChatCompletionResponse, ListModelsResponse } from "openai";
import { ErrorResponse } from "../model/ErrorResponse";
import { OpenAIService } from "../service/open-ai/OpenAIService";
import { AuthState } from "../model/AuthState";
import { CustomRequest } from "../model/CustomRequest";
import { ExtractChatMessageUtility } from "../util/ExtractChatMessageUtility";

export class OpenAIRoute {
    public router: Router;
    private openAIService: OpenAIService;

    constructor(openAIService: OpenAIService) {
        this.router = Router();
        this.openAIService = openAIService;
        this.routes();
    }

    private routes(): void {
        this.router.get('/', (req: CustomRequest, res: Response, next: NextFunction) => {
            res.send(`Welcome to OpenAI Server`)
        });

        this.router.get('/listmodels', (req: CustomRequest, res: Response, next: NextFunction) => {
            if (req.localCache.authState === AuthState.AUTHENTICATED.toString()) {
                this.openAIService.getModelList(req, res).then((response: ListModelsResponse) => {
                    res.status(200).json({
                        APISUCCESS: true,
                        response: response
                    })
                }).catch((err: Error) => {
                    next(new ErrorResponse('Error while listing Models', err.message, 401));
                });
            } else {
                next(new ErrorResponse('INVALID_REQUEST', 'Please pass in the `token` and the `username` ', 404));
            }
        });

        this.router.get('/completion', (req: CustomRequest, res: Response, next: NextFunction) => {
            if (req.localCache.authState === AuthState.AUTHENTICATED.toString()) {
                req.localCache.role = 'user';
                req.localCache.message = ExtractChatMessageUtility.extractChatMessage(req);
                this.openAIService.getCompletions(req, res).then((response: CreateChatCompletionResponse) => {
                    res.status(200).json({
                        APISUCCESS: true,
                        response: response
                    })
                }).catch((err: Error) => {
                    next(new ErrorResponse('Error while completing chat Models', err.message, 401));
                });
            }
        });
    }
}