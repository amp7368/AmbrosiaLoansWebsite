import {
    IsArray,
    IsDate,
    IsDecimal,
    IsDefined,
    IsEnum,
    IsNotEmptyObject,
    IsNumber,
    IsObject,
    IsOptional,
    isString,
    IsString,
    IsUUID,
    ValidateNested,
} from 'class-validator';
import { AmbrosiaException, AmbrosiaResponseOK } from '../BaseResponse';
import { Type } from 'class-transformer';
import { LoanEventSimple, LoanEventType } from './LoanEvent';

export type LoanEventCreate = Omit<LoanEventSimple, 'uuid' | 'date'>;
export class LoanEventCreateRuntime implements LoanEventCreate {
    @IsOptional()
    @IsUUID('4')
    collateral?: string;
    @IsEnum(LoanEventType)
    eventType: LoanEventType;
    @IsNumber()
    emeraldChange: number;
}

export type LoanEventCreateRequest = {
    event: LoanEventCreate;
};
export class LoanEventCreateRequestRuntime implements LoanEventCreateRequest {
    @ValidateNested()
    @IsDefined()
    @IsNotEmptyObject()
    @IsObject()
    @Type(() => LoanEventCreateRuntime)
    event: LoanEventCreateRuntime;
}
export type LoanEventCreateResponseOk = {
    event: LoanEventSimple;
} & AmbrosiaResponseOK;
export type LoanEventCreateResponse =
    | LoanEventCreateResponseOk
    | AmbrosiaException;
