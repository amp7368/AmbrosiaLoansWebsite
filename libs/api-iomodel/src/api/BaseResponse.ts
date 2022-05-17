import { StatusCodes } from 'http-status-codes';

export interface AmbrosiaException {
    message: string;
    status: Exclude<StatusCodes, StatusCodes.ACCEPTED>;
    isOk: false;
}
export interface AmbrosiaResponseOK extends AmbrosiaResponse {
    status: StatusCodes.ACCEPTED;
    isOk: true;
}
export interface AmbrosiaResponse {
    status: StatusCodes;
    isOk: boolean;
}
export const okResponse: AmbrosiaResponseOK = {
    status: StatusCodes.ACCEPTED,
    isOk: true,
};
