import { getManager } from 'typeorm';
import { AmbrosiaQuery } from '../../AmbrosiaQuery';
import { LoanEntity } from './Loan.entity';

export class LoanQuery extends AmbrosiaQuery {
    async findByIds(loan: string): Promise<LoanEntity> {
        return await getManager().findOne(LoanEntity, loan);
    }
    async list(): Promise<LoanEntity[]> {
        return await this.managerQueryBuilder(LoanEntity, 'loan').getMany();
    }
    async newloan(entity: LoanEntity): Promise<LoanEntity> {
        return await getManager().save(LoanEntity, entity);
    }
}
export const loanQuery = new LoanQuery();
