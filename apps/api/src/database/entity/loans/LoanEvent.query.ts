import { SimpleLoanEvent } from '@api/io-model';
import { getManager } from 'typeorm';

import { AmbrosiaQuery } from '../../AmbrosiaQuery';
import { CollateralLoanEntity } from '../collateral/entity/CollateralLoan.entity';
import { collateralLoanQuery } from '../collateral/query/CollateralLoan.query';
import { LoanEventEntity } from './LoanEvent.entity';

export class LoanEventQuery extends AmbrosiaQuery<LoanEventEntity> {
    async findByIds(ids: string[]): Promise<LoanEventEntity[]> {
        return await getManager().findByIds(LoanEventEntity, ids);
    }
    async newLoanEvent(event: SimpleLoanEvent): Promise<LoanEventEntity> {
        const collateral: CollateralLoanEntity[] =
            await collateralLoanQuery.findByIds(event.collateral);
        const entity: LoanEventEntity = LoanEventEntity.create({
            ...event,
            collateral,
        });
        return await this.save(entity);
    }
}
export const loanEventQuery = new LoanEventQuery(LoanEventEntity, 'loanevent');
