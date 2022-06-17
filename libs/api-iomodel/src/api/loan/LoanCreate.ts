import {
    IsArray,
    IsDate,
    IsDecimal,
    IsDefined,
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
import { LoanEvent } from '../loan-event/LoanEvent';
import { Collateral } from '../collateral';
import { LoanSimple } from './Loan';

export type CreateLoan = Omit<
    LoanSimple,
    'uuid' | 'currentLoan' | 'history'
> & { amountLoaned: number; date: Date; collateral: string[] };
export class CreateLoanRuntime implements CreateLoan {
    @IsUUID('4')
    client: string;
    @IsString()
    broker: string;
    @IsNumber()
    amountLoaned: number;
    @IsArray()
    @IsUUID('4', { each: true })
    collateral: string[];
    @IsNumber()
    rate: number;
    @IsDate()
    @Type(() => Date)
    date: Date;
}
export type LoanCreateRequest = {
    loan: CreateLoan;
};
export class LoanCreateRequestRuntime implements LoanCreateRequest {
    @ValidateNested()
    @IsDefined()
    @IsNotEmptyObject()
    @IsObject()
    @Type(() => CreateLoanRuntime)
    loan: CreateLoanRuntime;
}
export type LoanCreateResponseOk = { loan: LoanSimple } & AmbrosiaResponseOK;
export type LoanCreateResponse = LoanCreateResponseOk | AmbrosiaException;
