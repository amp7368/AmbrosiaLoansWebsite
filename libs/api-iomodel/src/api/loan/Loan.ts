import { LoanEvent } from '../loan-event/LoanEvent';

export interface Loan {
    // meta
    uuid: string;
    client: string;
    broker: string;
    // content
    currentLoan: number;
    // history
    history: LoanEvent[];
    rate: number;
}
export interface LoanSimple {
    // meta
    uuid: string;
    client: string;
    broker: string;
    // content
    currentLoan: number;
    // history
    history: string[];
    rate: number;
}
