import { IsString, IsUUID } from 'class-validator';
import { AmbrosiaException, AmbrosiaResponseOK } from '../BaseResponse';

export interface Collateral {
    uuid: string;
    comments: string;
}
export type CollateralResponseOk = {
    collateral: Collateral;
} & AmbrosiaResponseOK;
export type CollateralResponse = CollateralResponseOk | AmbrosiaException;

export type CollateralCreateRequest = { comments: string };
export class CollateralCreateRequestRuntime implements CollateralCreateRequest {
    @IsString()
    comments: string;
}
export type CollateralIdentifyRequest = { uuid: string };
