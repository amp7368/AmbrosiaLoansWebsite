import { AmbrosiaException, AmbrosiaResponseOK } from '../BaseResponse';
import { ClientSimple } from './Client';

export type ClientListResponseOk = AmbrosiaResponseOK & {
    clients: ClientSimple[];
};
export type ClientListResponse = ClientListResponseOk | AmbrosiaException;
