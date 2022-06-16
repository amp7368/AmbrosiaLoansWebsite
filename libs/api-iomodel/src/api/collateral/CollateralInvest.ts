import { AmbrosiaException, AmbrosiaResponseOK } from '../BaseResponse';
import { InvestEvent } from '../invest-event';
import { Collateral, CollateralSimple } from './Collateral';

export type CollateralInvest = Collateral & { event: InvestEvent };
export type CollateralInvestSimple = CollateralSimple & { event: string };

export type CollateralInvestResponseOk = {
    collateral: CollateralInvestSimple;
} & AmbrosiaResponseOK;
export type CollateralInvestResponse =
    | CollateralInvestResponseOk
    | AmbrosiaException;
