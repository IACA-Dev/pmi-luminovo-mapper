

export class CustomError extends Error {
    public readonly originalError?: Error;

    constructor(message: string, originalError?: Error) {
        super(message);
        this.name = new.target.name;
        this.originalError = originalError;
        Error.captureStackTrace(this, this.constructor);
    }
}