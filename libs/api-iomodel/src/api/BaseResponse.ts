import { StatusCodes } from 'http-status-codes';

export type BadStatusCode = Exclude<StatusCodes, StatusCodes.OK>;
export interface AmbrosiaException {
    message: string;
    status: BadStatusCode;
    isOk: false;
    extra?: unknown;
}
export interface AmbrosiaResponseOK extends AmbrosiaResponse {
    status: StatusCodes.OK;
    isOk: true;
}
export interface AmbrosiaResponse {
    status: StatusCodes;
    isOk: boolean;
}
export const okResponse: AmbrosiaResponseOK = {
    status: StatusCodes.OK,
    isOk: true,
};
