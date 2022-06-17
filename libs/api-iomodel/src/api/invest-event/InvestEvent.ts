import { Collateral, CollateralInvest } from '../collateral';

export enum InvestEventType {
    Create,
    Withdrawl,
    Deposit,
    ZeroOut,
}
export class InvestEvent {
    // metadata
    uuid: string;
    date: Date;

    // content
    eventType: string;
    emeraldChange: number;

    collateral?: Collateral;
}
export type InvestEventSimple = Omit<InvestEvent, 'collateral'> & {
    collateral?: string;
};
