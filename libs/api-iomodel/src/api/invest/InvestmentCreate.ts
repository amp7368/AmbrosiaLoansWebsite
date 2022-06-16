import { Type } from 'class-transformer';
import {
    IsDate,
    IsDefined,
    IsNotEmptyObject,
    IsNumber,
    IsObject,
    IsUUID,
    ValidateNested,
} from 'class-validator';

import { AmbrosiaException, AmbrosiaResponseOK } from '../BaseResponse';
import { InvestmentSimple } from './Investment';

export type CreateInvestment = Omit<
    InvestmentSimple,
    'uuid' | 'currentInvestment' | 'history'
>;
export class CreateInvestmentRuntime implements CreateInvestment {
    @IsUUID()
    client: string;
    @IsUUID()
    broker: string;
    @IsNumber()
    initialInvestment: number;
    @IsDate()
    startDate: Date;
}
export type InvestmentCreateRequest = {
    investment: CreateInvestment;
};
export class InvestmentCreateRequestRuntime implements InvestmentCreateRequest {
    @ValidateNested()
    @IsDefined()
    @IsNotEmptyObject()
    @IsObject()
    @Type(() => CreateInvestmentRuntime)
    investment: CreateInvestmentRuntime;
}
export type InvestmentCreateResponseOk = {
    investment: InvestmentSimple;
} & AmbrosiaResponseOK;
export type InvestmentCreateResponse =
    | InvestmentCreateResponseOk
    | AmbrosiaException;
