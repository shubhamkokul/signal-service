import { Jwt, JwtPayload, sign, verify } from "jsonwebtoken";
import { VerifyResponse } from "../../model/VerifyResponse";

export class TokenManagementService {

    private secret: string;

    constructor(secret: string) {
        this.secret = secret;
    }

    private getTokenData(token: string): Jwt {
        return verify(token, this.secret, { complete: true });
    }

    public createTokenFromUserName(username: string): string {
        try {
            return sign({ username: username }, this.secret, { algorithm: "HS256", expiresIn: "30d" })
        } catch (err) {
            throw new Error("Invalid Username error generating JWT");
        }
    }

    public verfiyToken(token: string, username: string): boolean {
        const response: Jwt | undefined = this.getTokenData(token);
        if (response && response.payload) {
            const payload: string | JwtPayload = response.payload;
            return (payload as JwtPayload).username === username;
        }
        return false;
    }

    public getDataFromToken(token: string): VerifyResponse {
        const response: Jwt | undefined = this.getTokenData(token);
        if (response && response.payload) {
            return new VerifyResponse(response.payload as VerifyResponse);
        }
        return new VerifyResponse();
    }

    public verifyTokenForSocket(token: string, username: string): boolean {
        if (token && username) {
            const value: string[] = token.split(' ');
            return this.verfiyToken(value[1], username);
        }
        return false;
    }
}