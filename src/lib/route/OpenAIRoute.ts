import { NextFunction, Request, Response, Router } from "express";
import { ListModelsResponse } from "openai";
import { ErrorResponse } from "../model/ErrorResponse";
import { OpenAIService } from "../service/open-ai/OpenAIService";

export class OpenAIRoute {
    public router: Router;
    private openAIService: OpenAIService;

    constructor(openAIService: OpenAIService) {
        this.router = Router();
        this.openAIService = openAIService;
        this.routes();
    }

    private routes(): void {
        this.router.get('/', (req: Request, res: Response, next: NextFunction) => {
            res.send(`Welcome to OpenAI Server`)
        });

        this.router.get('/listmodels', (req: Request, res: Response, next: NextFunction) => {
            this.openAIService.getModelList(req, res).then((response: ListModelsResponse) => {
                res.status(200).json({
                    APISUCCESS: true,
                    response: response
                })
            }).catch((err: Error) => {
                next(new ErrorResponse('Error while listing Models', err.message, 401));
            });
        });
    }
}