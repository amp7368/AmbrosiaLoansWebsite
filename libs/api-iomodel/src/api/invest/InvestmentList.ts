import { AmbrosiaException, AmbrosiaResponseOK } from '../BaseResponse';
import { InvestmentSimple } from './Investment';

export type InvestmentListResponseOk = {
    investments: InvestmentSimple[];
} & AmbrosiaResponseOK;
export type InvestmentListResponse =
    | InvestmentListResponseOk
    | AmbrosiaException;
