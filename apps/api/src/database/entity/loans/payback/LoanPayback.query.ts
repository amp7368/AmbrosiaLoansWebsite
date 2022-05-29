import { getManager } from 'typeorm';
import { AmbrosiaQuery } from '../../../AmbrosiaQuery';
import { LoanPaybackEntity } from './LoanPayback.entity';

export class LoanPaybackQuery extends AmbrosiaQuery {
    async newPayback(entity: LoanPaybackEntity): Promise<LoanPaybackEntity> {
        return await getManager().save(LoanPaybackEntity, entity);
    }
    async list(): Promise<LoanPaybackEntity[]> {
        return await this.managerQueryBuilder(
            LoanPaybackEntity,
            'payback'
        ).getMany();
    }
}
export const loanPaybackQuery = new LoanPaybackQuery();
