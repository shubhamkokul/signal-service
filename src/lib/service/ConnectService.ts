import { Configuration, OpenAIApi } from "openai";

export class ConnectService {
    private apiKey: string;
    private orgKey: string;

    constructor(apiKey: string, orgKey: string) {
        this.apiKey = apiKey;
        this.orgKey = orgKey;
    }


    // Todo: Instead of directly connecting with the service first connect to General API Key-Store and later connect to the service which is required.
    public getOpenAIAPIClient(): OpenAIApi {
        const configuration = new Configuration({
            organization: this.orgKey,
            apiKey: this.apiKey,
        });
        return new OpenAIApi(configuration);
    }

}