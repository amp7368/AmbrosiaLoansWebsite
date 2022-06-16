import { CreateInvestmentRuntime, InvestmentSimple } from '@api/io-model';
import { getManager } from 'typeorm';

import { AmbrosiaQuery } from '../../AmbrosiaQuery';
import { loanQuery } from '../loans/Loan.query';
import { InvestEventEntity } from './InvestEvent.entity';
import { investEventQuery } from './InvestEvent.query';
import { InvestmentEntity } from './Investment.entity';

export class InvestmentQuery extends AmbrosiaQuery<InvestmentEntity> {
    async create(
        investment: CreateInvestmentRuntime
    ): Promise<InvestmentEntity> {
        return await this.save(InvestmentEntity.create({ ...investment }));
    }
    toSimple(entity: InvestmentEntity): InvestmentSimple {
        return {
            ...entity,
            history: entity.history.map((event) => event.uuid),
        };
    }
    async findByIds(ids: string[]): Promise<InvestmentEntity[]> {
        return await getManager().findByIds(InvestmentEntity, ids);
    }
    async newInvestment(client: InvestmentSimple): Promise<InvestmentEntity> {
        const history: InvestEventEntity[] = await investEventQuery.findByIds(
            client.history
        );
        const entity: InvestmentEntity = InvestmentEntity.create({
            ...client,
            history,
        });
        return await this.save(entity);
    }
}
export const investmentQuery = new InvestmentQuery(
    InvestmentEntity,
    'investment'
);
