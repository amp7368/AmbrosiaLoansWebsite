import { IsString, IsUUID } from 'class-validator';
import { AmbrosiaResponseOK } from '../BaseResponse';

export interface Collateral {
    uuid: string;
    comments: string;
}
export type CollateralResponse = {
    collateral: Collateral;
} & AmbrosiaResponseOK;

export type CollateralCreateRequest = {
    comments: string;
};
export class CollateralCreateRequestRuntime implements CollateralCreateRequest {
    @IsString()
    comments: string;
}
export type CollateralIdentifyRequest = {
    uuid: string;
};
