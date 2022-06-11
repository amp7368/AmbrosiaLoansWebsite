import { CollateralInvest } from '@api/io-model';

import { AmbrosiaQuery } from '../../../AmbrosiaQuery';
import { CollateralEntity } from '../entity/Collateral.entity';
import { CollateralInvestEntity } from '../entity/CollateralInvest.entity';

export class CollateralInvestQuery extends AmbrosiaQuery<CollateralInvestEntity> {}
export const collateralInvestQuery = new CollateralInvestQuery(
    CollateralInvestEntity,
    'collateral_invest'
);
