import { Type } from 'class-transformer';

import { Collateral } from '../collateral';

export enum LoanEventType {
    Create = 'Create',
    Loan = 'Loan',
    Payback = 'Payback',
    ZeroOut = 'ZeroOut',
}
export interface LoanEvent {
    // metadata
    uuid: string;
    date: Date;
    // content
    eventType: LoanEventType;
    emeraldChange: number;
    collateral?: Collateral;
}
export type LoanEventSimple = {
    // metadata
    uuid: string;
    date: Date;
    // content
    eventType: LoanEventType;
    emeraldChange: number;
    collateral?: string;
};
