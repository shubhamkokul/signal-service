import { ListModelsResponse, OpenAIApi } from "openai";
import { Response } from "express";
import { CustomRequest } from "src/lib/model/CustomRequest";

export class OpenAIService {

    private openApiClient: OpenAIApi;

    constructor(openApiClient: OpenAIApi) {
        this.openApiClient = openApiClient;
    }

    public async getModelList(req: CustomRequest, res: Response): Promise<ListModelsResponse> {
        return new Promise((resolve, reject) => {
            this.openApiClient.listModels().then((response) => {
                resolve(response.data);
            }).catch((error) => {
                reject(error);
            });
        });
    }
}