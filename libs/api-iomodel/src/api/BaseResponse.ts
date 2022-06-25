import { StatusCodes } from 'http-status-codes';

export type BadStatusCode = Exclude<StatusCodes, StatusCodes.OK>;
export interface AmbrosiaException {
    message: string;
    status: BadStatusCode;
    isOk: false;
    extra?: unknown;
}
export type AmbrosiaResponseOK<T = unknown> = {
    status: StatusCodes.OK;
    isOk: true;
} & T;
export type AmbrosiaResponse<OnOk = unknown> =
    | AmbrosiaException
    | (AmbrosiaResponseOK & OnOk);
export const okResponse: AmbrosiaResponseOK = {
    status: StatusCodes.OK,
    isOk: true,
};
