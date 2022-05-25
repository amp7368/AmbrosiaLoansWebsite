import { AmbrosiaQuery } from '../../AmbrosiaQuery';
import { LoanEntity } from './Loan.entity';

export class LoanQuery extends AmbrosiaQuery {
    // async newloan(
    //     loan: string,
    //     client: Omit<Loan, 'uuid'>
    // ): Promise<LoanEntity> {
    //     const entity: LoanEntity = LoanEntity.create(client);
    //     return await getManager().save(entity);
    // }
}
export const loanQuery = new LoanQuery();
