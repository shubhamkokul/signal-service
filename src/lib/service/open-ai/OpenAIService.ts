import { CreateChatCompletionResponse, ListModelsResponse, OpenAIApi } from "openai";
import { Response } from "express";
import { CustomRequest } from "../../model/CustomRequest";
import { OpenAIModel } from "../../model/OpenAIModel";

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

    public async getCompletions(req: CustomRequest, res: Response): Promise<CreateChatCompletionResponse> {
        return new Promise((resolve, reject) => {
            this.openApiClient.createChatCompletion({
                model: OpenAIModel.GPT_35_turbo,
                messages: [{ "role": req.localCache.role, "content": req.localCache.message }],
            }).then((response) => {
                resolve(response.data);
            }).catch((error) => {
                reject(error);
            });
        });
    }
}