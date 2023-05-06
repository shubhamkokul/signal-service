import { CustomRequest } from "../model/CustomRequest";

export class ExtractChatMessageUtility {

    public static extractChatMessage(req: CustomRequest): void {
        return req.query && req.query.message || req.body && req.body.message || req.params.message || req.headers['message'] || '';
    }

}