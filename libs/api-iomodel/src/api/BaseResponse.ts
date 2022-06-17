import { StatusCodes } from 'http-status-codes';

export type BadStatusCode = Exclude<StatusCodes, StatusCodes.OK>;
export interface AmbrosiaException {
    message: string;
    status: BadStatusCode;
    isOk: false;
    extra?: unknown;
}
export interface AmbrosiaResponseOK {
    status: StatusCodes.OK;
    isOk: true;
}
export type AmbrosiaResponse = AmbrosiaException | AmbrosiaResponseOK;
export const okResponse: AmbrosiaResponseOK = {
    status: StatusCodes.OK,
    isOk: true,
};
