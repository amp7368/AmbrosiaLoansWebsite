import { InvestEventSimple } from '@api/io-model';
import { getManager } from 'typeorm';

import { AmbrosiaQuery } from '../../AmbrosiaQuery';
import { collateralQuery } from '../collateral/query/Collateral.query';
import { InvestEventEntity } from './InvestEvent.entity';

export class InvestmentEventQuery extends AmbrosiaQuery<InvestEventEntity> {
    toSimple(entity: InvestEventEntity): InvestEventSimple {
        return {
            ...entity,
            collateral: entity.collateral.uuid,
        };
    }
    async findByIds(ids: string[]): Promise<InvestEventEntity[]> {
        return await getManager().findByIds(InvestEventEntity, ids);
    }
    async create(event: InvestEventSimple): Promise<InvestEventEntity> {
        const collateral = await collateralQuery.find(event.collateral);
        const entity = InvestEventEntity.create({ ...event, collateral });
        return await this.save(entity);
    }
}
export const investEventQuery = new InvestmentEventQuery(
    InvestEventEntity,
    'event'
);
