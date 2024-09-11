import {CustomError} from "./CustomError";


export class CSVGeneratingError extends CustomError {
    constructor(message: string, originalError?: Error) {
        super(`CSV_GENERATING_ERROR: ${message}`, originalError);
    }
}