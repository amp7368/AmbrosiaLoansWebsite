import { Loan } from '@api/io-model';
import { getManager } from 'typeorm';
import { AmbrosiaQuery } from '../../AmbrosiaQuery';
import { LoanEntity } from './Loan.entity';

export class LoanQuery extends AmbrosiaQuery {
    convertLoan(loan: LoanEntity): Loan {
        return {
            ...loan,
            collateral: loan.collateral?.map((coll) => coll.uuid),
            payback: loan.payback?.map((pay) => pay.uuid),
        };
    }
    async findByIds(loan: string): Promise<LoanEntity> {
        return await getManager().findOne(LoanEntity, loan);
    }
    async getLoans(): Promise<LoanEntity[]> {
        return await this.managerQueryBuilder(LoanEntity, 'loan').getMany();
    }
    async newloan(entity: LoanEntity): Promise<LoanEntity> {
        return await getManager().save(LoanEntity, entity);
    }
}
export const loanQuery = new LoanQuery();
