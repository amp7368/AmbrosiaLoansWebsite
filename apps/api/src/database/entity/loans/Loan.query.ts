import { getManager } from 'typeorm';
import { AmbrosiaQuery } from '../../AmbrosiaQuery';
import { LoanEntity } from './Loan.entity';

export class LoanQuery extends AmbrosiaQuery {
    async list(): Promise<LoanEntity[]> {
        return await this.managerQueryBuilder(LoanEntity, 'loan').getMany();
    }
    async newloan(entity: LoanEntity): Promise<LoanEntity> {
        return await getManager().save(entity);
    }
}
export const loanQuery = new LoanQuery();
