import {
    AmbrosiaException,
    AmbrosiaResponse,
    AmbrosiaResponseOK,
} from '../BaseResponse';
import { Role } from './Role';
import { SessionBase } from './SessionBase';

export type LoginResponseOk = AmbrosiaResponseOK<{
    session: SessionBase;
}>;
export type LoginResponse = AmbrosiaResponse<LoginResponseOk>;
