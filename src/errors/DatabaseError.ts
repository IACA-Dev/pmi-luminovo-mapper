import {CustomError} from "./CustomError";


export class DatabaseError extends CustomError {
    constructor(message: string, originalError?: Error) {
        super(`DATABASE_ERROR: ${message}`, originalError);
    }
}