import { HttpStatus } from '@nestjs/common';

export interface AmbrosiaException {
    message: string;
    status: Exclude<HttpStatus, HttpStatus.ACCEPTED>;
    isOk: false;
}
export interface AmbrosiaResponseOK extends AmbrosiaResponse {
    status: HttpStatus.ACCEPTED;
    isOk: true;
}
export interface AmbrosiaResponse {
    status: HttpStatus;
    isOk: boolean;
}
export const okResponse = {
    status: HttpStatus.ACCEPTED,
    isOk: true,
} as AmbrosiaResponseOK;
