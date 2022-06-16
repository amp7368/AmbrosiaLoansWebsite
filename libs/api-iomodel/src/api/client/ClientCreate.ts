import { Type } from 'class-transformer';
import {
    IsArray,
    IsDefined,
    IsNumber,
    IsObject,
    IsOptional,
    IsString,
    IsUUID,
    ValidateNested,
} from 'class-validator';
import { AmbrosiaException, AmbrosiaResponseOK } from '../BaseResponse';
import { ClientSimple } from './Client';
export type ClientCreate = Omit<ClientSimple, 'uuid' | 'loans' | 'investments'>;
export class ClientCreateRuntime implements ClientCreate {
    @IsString()
    displayName: string;
    @IsUUID()
    @IsOptional()
    mcId?: string;
    @IsString()
    @IsOptional()
    mcName?: string;
    @IsNumber()
    @IsOptional()
    discordId?: number;
    @IsString()
    @IsOptional()
    discordTag?: string;
}
export type ClientCreateResponseOk = AmbrosiaResponseOK & {
    client: ClientSimple;
};
export type ClientCreateResponse = ClientCreateResponseOk | AmbrosiaException;

export type ClientCreateRequest = { client: ClientCreate };
export class ClientCreateRequestRuntime implements ClientCreateRequest {
    @IsObject()
    @ValidateNested()
    @IsDefined()
    @Type(() => ClientCreateRuntime)
    client: ClientCreateRuntime;
}
