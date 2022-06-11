import { CollateralLoan } from '@api/io-model';

import { AmbrosiaQuery } from '../../../AmbrosiaQuery';
import { CollateralLoanEntity } from '../entity/CollateralLoan.entity';

export class CollateralLoanQuery extends AmbrosiaQuery<CollateralLoanEntity> {}
export const collateralLoanQuery = new CollateralLoanQuery(
    CollateralLoanEntity,
    'collateral_loan'
);
