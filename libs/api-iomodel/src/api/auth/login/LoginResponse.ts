import { AmbrosiaResponseOK } from '../../BaseResponse';
import { SessionBase } from '../SessionBase';

export type LoginResponse = AmbrosiaResponseOK & {
    session: SessionBase;
};
