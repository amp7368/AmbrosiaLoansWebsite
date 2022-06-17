import { AmbrosiaException, AmbrosiaResponseOK } from '../BaseResponse';
import { SessionBase } from './SessionBase';

export type LoginResponseOk = AmbrosiaResponseOK & {
    session: SessionBase;
};
export type LoginResponse = LoginResponseOk | AmbrosiaException;
