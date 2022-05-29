import { Type } from 'class-transformer';
import {
    IsDate,
    IsDecimal,
    IsDefined,
    IsNotEmptyObject,
    IsNumber,
    IsObject,
    IsOptional,
    IsUUID,
    ValidateNested,
} from 'class-validator';

export interface LoanPayback {
    uuid: number;
    loan: string;
    paybackDate: Date;
    amountBack: number;
}
export type LoanPaybackCreate = Omit<LoanPayback, 'uuid' | 'paybackDate'> & {
    paybackDate?: Date;
};
export class LoanPaybackRuntime implements LoanPaybackCreate {
    @IsUUID()
    loan: string;

    @IsOptional()
    @IsDate()
    paybackDate?: Date;

    @IsNumber()
    amountBack: number;
}
export type LoanPaybackRequest = {
    payback: LoanPaybackCreate;
};
export class LoanPaybackRequestRuntime implements LoanPaybackRequest {
    @ValidateNested()
    @IsDefined()
    @IsNotEmptyObject()
    @IsObject()
    @Type(() => LoanPaybackRuntime)
    payback: LoanPaybackRuntime;
}
