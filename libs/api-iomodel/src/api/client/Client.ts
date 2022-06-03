import { IsObject, IsString, IsUUID } from 'class-validator';
import { AmbrosiaException, AmbrosiaResponseOK } from '../BaseResponse';

export interface ClientProfile {
    uuid: string;
    displayName: string;
    discordTag: string;
}
export class ClientProfileRuntime implements ClientProfile {
    @IsUUID()
    uuid: string;
    @IsString()
    displayName: string;
    @IsString()
    discordTag: string;
}
export type ClientListResponseOk = AmbrosiaResponseOK & {
    clients: ClientProfile[];
};
export type ClientListResponse = ClientListResponseOk | AmbrosiaException;

export type ClientCreateResponse = AmbrosiaResponseOK & {
    client: ClientProfile;
};

export type ClientCreateRequest = {
    client: Omit<ClientProfile, 'uuid'>;
};
export class ClientCreateRequestRuntime implements ClientCreateRequest {
    @IsObject()
    client: Omit<ClientProfileRuntime, 'uuid'>;
}
