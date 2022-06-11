import { Type } from 'class-transformer';
import {
    IsArray,
    IsDefined,
    IsNumber,
    IsObject,
    IsString,
    IsUUID,
    ValidateNested,
} from 'class-validator';

import { AmbrosiaException, AmbrosiaResponseOK } from '../BaseResponse';
import { Investment } from '../investment/Investment';
import { Loan } from '../loan';

export interface Client {
    uuid: string;
    displayName: string;

    // minecraft
    mcId: string;
    mcName: string;

    // discord
    discordId: number;
    discordTag: string;

    loans: Loan[];
    investments: Investment[];
}
export interface ClientSimple {
    uuid: string;
    displayName: string;

    // minecraft
    mcId?: string;
    mcName?: string;

    // discord
    discordId?: number;
    discordTag?: string;

    loans: string[];
    investments: string[];
}
export class ClientRuntime implements ClientSimple {
    @IsUUID()
    uuid: string;
    @IsString()
    displayName: string;
    @IsUUID()
    mcId?: string;
    @IsString()
    mcName?: string;
    @IsNumber()
    discordId?: number;
    @IsString()
    discordTag?: string;
    @IsArray()
    @IsUUID('4', { each: true })
    loans: string[];
    @IsArray()
    @IsUUID('4', { each: true })
    investments: string[];
}
export type ClientListResponseOk = AmbrosiaResponseOK & {
    clients: ClientSimple[];
};
export type ClientListResponse = ClientListResponseOk | AmbrosiaException;

export type ClientCreateResponseOk = AmbrosiaResponseOK & {
    client: ClientSimple;
};
export type ClientCreateResponse = ClientCreateResponseOk | AmbrosiaException;

export type ClientCreateRequest = {
    client: Omit<ClientSimple, 'uuid' | 'loans' | 'investments'>;
};
export class ClientCreateRequestRuntime implements ClientCreateRequest {
    @IsObject()
    @ValidateNested()
    @IsDefined()
    @Type(() => ClientRuntime)
    client: Omit<ClientRuntime, 'uuid' | 'loans' | 'investments'>;
}
