import { CreateLoan, Loan, SimpleLoan } from '@api/io-model';
import { getManager } from 'typeorm';
import { AmbrosiaQuery } from '../../AmbrosiaQuery';
import { LoanEntity } from './Loan.entity';
import { LoanEventEntity } from './LoanEvent.entity';
import { loanEventQuery } from './LoanEvent.query';

export class LoanQuery extends AmbrosiaQuery<LoanEntity> {
    toSimple(loan: LoanEntity): SimpleLoan {
        return {
            ...loan,
            history: loan.history.map((pay) => pay.uuid),
        };
    }
    async getLoans(): Promise<LoanEntity[]> {
        return await this.managerQB().getMany();
    }
    async createLoan(loan: CreateLoan): Promise<LoanEntity> {
        const history: LoanEventEntity[] = await loanEventQuery.findByIds(
            loan.history
        );
        const entity: LoanEntity = LoanEntity.create({
            ...loan,
            history,
        });
        return await this.save(entity);
    }
}
export const loanQuery = new LoanQuery(LoanEntity, 'loan');
