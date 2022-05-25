import { IsDate, IsDecimal, IsNumber, IsString, IsUUID } from 'class-validator';

export class LoanRuntime {
    @IsUUID()
    uuid: string;
    @IsUUID()
    client: string;
    @IsUUID()
    collateral: CollateralEntity[];

    @IsNumber()
    amountLoaned: number;
    @IsDecimal()
    rate: number;
    @IsString()
    broker: string;
    @IsDate()
    startDate: Date;
    @Is
    payback: LoanPaybackEntity[];
}
