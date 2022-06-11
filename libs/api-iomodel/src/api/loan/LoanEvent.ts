import { IsArray, IsEnum, IsNumber, IsUUID } from 'class-validator';
import { Collateral } from '../collateral';

export enum LoanEventType {
    Create,
    Withdrawl,
    Deposit,
    ZeroOut,
}
export class LoanEvent {
    // metadata
    uuid: string;
    date: Date;
    // content
    eventType: LoanEventType;
    emeraldChange: number;
    collateral: Collateral[];
}
export type SimpleLoanEvent = {
    // metadata
    uuid: string;
    date: Date;
    // content
    eventType: LoanEventType;
    emeraldChange: number;
    collateral: string[];
};
export type LoanEventCreateRequest = Omit<SimpleLoanEvent, 'uuid' | 'date'>;
export class LoanEventCreateRequestRuntime implements LoanEventCreateRequest {
    @IsArray()
    @IsUUID('4', { each: true })
    collateral: string[];
    @IsEnum(LoanEventType)
    eventType: LoanEventType;
    @IsNumber()
    emeraldChange: number;
}
