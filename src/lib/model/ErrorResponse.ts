export class ErrorResponse extends Error {
    public statusCode: number;
    public message: string;
    constructor(name: string, message: string, statusCode: number) {
        super(name);
        this.message = message;
        this.statusCode = statusCode;
    }
}