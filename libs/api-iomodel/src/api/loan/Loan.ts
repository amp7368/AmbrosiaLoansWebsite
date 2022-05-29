import {
    IsArray,
    IsDate,
    IsDecimal,
    IsDefined,
    IsNotEmptyObject,
    IsNumber,
    IsObject,
    IsOptional,
    IsString,
    IsUUID,
    ValidateNested,
} from 'class-validator';
import { AmbrosiaResponseOK } from '../BaseResponse';
import { Type } from 'class-transformer';

export interface Loan {
    uuid: string;
    client: string;
    collateral: string[];
    amountLoaned: number;
    rate: number;
    broker: string;
    startDate: Date;
    payback: string[];
}
export type CreateLoan = Omit<Loan, 'uuid' | 'startDate' | 'payback'> & {
    startDate?: Date;
};
export class CreateLoanRuntime implements CreateLoan {
    @IsUUID('4')
    client: string;

    @IsArray()
    @IsUUID('4', { each: true })
    collateral: string[];

    @IsNumber()
    amountLoaned: number;
    @IsNumber()
    rate: number;
    @IsString()
    broker: string;
    @IsOptional()
    @IsDate()
    startDate?: Date;
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
export type LoanCreateResponse = { loan: Loan } & AmbrosiaResponseOK;
