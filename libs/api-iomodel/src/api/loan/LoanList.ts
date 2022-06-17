import { AmbrosiaException, AmbrosiaResponseOK } from '../BaseResponse';
import { LoanSimple } from './Loan';

export type LoanListResponseOk = { loans: LoanSimple[] } & AmbrosiaResponseOK;
export type LoanListResponse = LoanListResponseOk | AmbrosiaException;
