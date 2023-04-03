import { ListModelsResponse, OpenAIApi } from "openai";
import { Request, Response } from "express";
import { ErrorResponse } from "../../model/ErrorResponse";

export class OpenAIService {

    private openApiClient: OpenAIApi;

    constructor(openApiClient: OpenAIApi) {
        this.openApiClient = openApiClient;
    }

    public async getModelList(req: Request, res: Response): Promise<ListModelsResponse> {
        return new Promise((resolve, reject) => {
            this.openApiClient.listModels().then((response) => {
                resolve(response.data);
            }).catch((error) => {
                reject(error);
            });
        });
    }
}