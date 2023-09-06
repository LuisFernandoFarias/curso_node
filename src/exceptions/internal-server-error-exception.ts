import { AppException } from "./app-exception";

export class InternalServerErrorException extends AppException {
    constructor(message: string) {
        super('Internal server error', 500)
    }
}