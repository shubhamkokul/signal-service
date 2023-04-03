export class ErrorResponse extends Error {
    public status: number;
    public message: string;
    public stack: string;
    public config: JSON | undefined;
    constructor(name: string, message: string, status: number, stack?: string, config?: JSON) {
        super(name);
        this.message = message;
        this.status = status;
        this.stack = stack || '';
        this.config = config || undefined;
    }
}