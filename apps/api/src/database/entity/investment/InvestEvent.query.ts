import { InvestEventSimple } from '@api/io-model';
import { getManager } from 'typeorm';

import { AmbrosiaQuery } from '../../AmbrosiaQuery';
import { CollateralInvestEntity } from '../collateral/entity/CollateralInvest.entity';
import { collateralQuery } from '../collateral/query/Collateral.query';
import { collateralInvestQuery } from '../collateral/query/CollateralInvest.query';
import { loanQuery } from '../loans/Loan.query';
import { InvestEventEntity } from './InvestEvent.entity';

export class InvestmentEventQuery extends AmbrosiaQuery<InvestEventEntity> {
    toSimple(entity: InvestEventEntity): InvestEventSimple {
        return {
            ...entity,
            collateral: entity.collateral.map((collateral) => collateral.uuid),
        };
    }
    async findByIds(ids: string[]): Promise<InvestEventEntity[]> {
        return await getManager().findByIds(InvestEventEntity, ids);
    }
    async create(event: InvestEventSimple): Promise<InvestEventEntity> {
        const rawCollateral = await collateralQuery.findByIds(event.collateral);
        const collateral = rawCollateral.map(CollateralInvestEntity.create);
        const entity = InvestEventEntity.create({ ...event, collateral });
        return await this.save(entity);
    }
}
export const investEventQuery = new InvestmentEventQuery(
    InvestEventEntity,
    'event'
);
