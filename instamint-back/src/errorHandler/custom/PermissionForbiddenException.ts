import { ForbiddenException } from "@nestjs/common";

export class PermissionForbiddenException extends ForbiddenException {
    constructor(message: string , error?: string) {
        super(message, error);  
    }
}