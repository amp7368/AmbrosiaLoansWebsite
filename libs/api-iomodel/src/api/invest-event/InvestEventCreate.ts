import { Type } from 'class-transformer';
import {
    IsDefined,
    IsEnum,
    IsNotEmptyObject,
    IsNumber,
    IsObject,
    IsOptional,
    IsUUID,
    ValidateNested,
} from 'class-validator';

import { AmbrosiaException, AmbrosiaResponseOK } from '../BaseResponse';
import { InvestEvent, InvestEventSimple, InvestEventType } from './InvestEvent';

export type CreateInvestEvent = Omit<InvestEventSimple, 'uuid' | 'date'>;
export class CreateInvestEventRuntime implements CreateInvestEvent {
    @IsUUID('4')
    collateral: string[];
    @IsEnum(InvestEventType)
    eventType: string;
    @IsNumber()
    emeraldChange: number;
}
export type InvestEventCreateRequest = {
    event: CreateInvestEvent;
    collateral?: string;
};
export class InvestEventCreateRequestRuntime
    implements InvestEventCreateRequest
{
    @ValidateNested()
    @IsDefined()
    @IsNotEmptyObject()
    @IsObject()
    @Type(() => CreateInvestEventRuntime)
    event: CreateInvestEventRuntime;
    @IsUUID('4')
    @IsOptional()
    collateral?: string;
}
export type InvestEventCreateResponseOk = {
    event: InvestEvent;
} & AmbrosiaResponseOK;
export type InvestEventCreateResponse =
    | InvestEventCreateResponseOk
    | AmbrosiaException;
