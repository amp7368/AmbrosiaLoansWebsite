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
import { LoanEvent } from './LoanEvent';
import { Collateral } from '../collateral';

export interface Loan {
    // meta
    uuid: string;
    client: string;
    broker: string;
    // content
    currentLoan: number;
    // history
    history: LoanEvent[];
    amountLoaned: number;
    rate: number;
}
export interface SimpleLoan {
    // meta
    uuid: string;
    client: string;
    broker: string;
    // content
    currentLoan: number;
    // history
    history: string[];
    amountLoaned: number;
    rate: number;
}
export type CreateLoan = Omit<SimpleLoan, 'uuid'>;
export class CreateLoanRuntime implements CreateLoan {
    @IsUUID('4')
    client: string;
    @IsString()
    broker: string;
    @IsNumber()
    currentLoan: number;
    @IsArray()
    @IsUUID('4', { each: true })
    history: string[];
    @IsNumber()
    amountLoaned: number;
    @IsNumber()
    rate: number;
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
export type LoanCreateResponseOk = { loan: SimpleLoan } & AmbrosiaResponseOK;
export type LoanCreateResponse = LoanCreateResponseOk | AmbrosiaException;
export type LoanListResponseOk = { loans: SimpleLoan[] } & AmbrosiaResponseOK;
export type LoanListResponse = LoanListResponseOk | AmbrosiaException;
