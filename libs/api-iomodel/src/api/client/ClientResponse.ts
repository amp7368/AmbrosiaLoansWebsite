import { AmbrosiaResponseOK } from '../BaseResponse';

export interface ClientProfileBase {
    uuid: string;
    displayName: string;
    discordId: number;
    discordTag: string;
    credit: number;
    emeraldsInvested: number;
}

export type ClientListResponse = AmbrosiaResponseOK & {
    clients: ClientProfileBase[];
};
export type ClientCreateResponse = AmbrosiaResponseOK & {
    client: ClientProfileBase;
};
