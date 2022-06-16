import { AmbrosiaException, AmbrosiaResponseOK } from '../BaseResponse';
import { LoanEvent } from '../loan-event';
import { Collateral, CollateralSimple } from './Collateral';

export type CollateralLoan = Collateral & { event: LoanEvent };
export type CollateralLoanSimple = CollateralSimple & { event: string };

export type CollateralLoanResponseOk = {
    collateral: CollateralLoanSimple;
} & AmbrosiaResponseOK;
export type CollateralLoanResponse =
    | CollateralLoanResponseOk
    | AmbrosiaException;
