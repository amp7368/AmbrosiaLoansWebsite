import { IsString, IsUUID } from 'class-validator';
import { AmbrosiaException, AmbrosiaResponseOK } from '../BaseResponse';

export interface Collateral {
    uuid: string;
    comments: string;
    depositDate: Date;
    withdrawlDate: Date;
}
export type CollateralSimple = Collateral;
export type CollateralResponseOk = {
    collateral: CollateralSimple;
} & AmbrosiaResponseOK;
export type CollateralResponse = CollateralResponseOk | AmbrosiaException;

export type CollateralCreateRequest = Omit<
    CollateralSimple,
    'uuid' | 'depositDate' | 'withdrawlDate'
>;
export class CollateralCreateRequestRuntime implements CollateralCreateRequest {
    @IsString()
    comments: string;
}
export type CollateralIdentifyRequest = { uuid: string };
export class CollateralIdentifyRequestRuntime
    implements CollateralIdentifyRequest
{
    @IsUUID('4')
    uuid: string;
}
