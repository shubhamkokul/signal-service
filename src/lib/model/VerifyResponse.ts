export class VerifyResponse {
    username: string;
    iat: number;
    exp: number;

    constructor(verifyResponse?: VerifyResponse) {
        this.username = verifyResponse?.username ?? '';
        this.iat = verifyResponse?.iat ?? 0;
        this.exp = verifyResponse?.exp ?? 0;
    }
}