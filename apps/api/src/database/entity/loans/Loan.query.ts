import {
    Collateral,
    CreateLoan,
    LoanEventType,
    LoanSimple,
} from '@api/io-model';

import { AmbrosiaQuery } from '../../AmbrosiaQuery';
import { collateralQuery } from '../collateral/query/Collateral.query';
import { LoanEntity } from './Loan.entity';
import { LoanEventEntity } from './LoanEvent.entity';
import { loanEventQuery } from './LoanEvent.query';
function collateralFind(collateral: string) {
    return collateralQuery.find(collateral);
}
export class LoanQuery extends AmbrosiaQuery<LoanEntity> {
    toSimple(loan: LoanEntity): LoanSimple {
        return {
            ...loan,
            history: loan.history?.map((pay) => pay.uuid),
        };
    }
    async getLoans(): Promise<LoanEntity[]> {
        return await this.managerQB().getMany();
    }
    async create(loan: CreateLoan): Promise<LoanEntity> {
        const loanPreEntity = LoanEntity.create({
            ...loan,
            currentLoan: loan.amountLoaned,
        });
        const loanEntity: LoanEntity = await this.save(loanPreEntity);
        const collateralToEvent = async (collateral: Promise<Collateral>) =>
            LoanEventEntity.create({
                date: loan.date,
                eventType: LoanEventType.Create,
                emeraldChange: 0,
                loan: loanEntity,
                collateral: await collateral,
            });
        const eventPreEntity: LoanEventEntity[] = await Promise.all([
            ...loan.collateral.map(collateralFind).map(collateralToEvent),
            Promise.resolve(
                LoanEventEntity.create({
                    date: loan.date,
                    eventType: LoanEventType.Create,
                    emeraldChange: loan.amountLoaned,
                    loan: loanEntity,
                    collateral: undefined,
                })
            ),
        ]);
        console.log(eventPreEntity);
        await Promise.all(eventPreEntity.map((e) => loanEventQuery.save(e)));
        return this.find(loanEntity.uuid);
    }
}
export const loanQuery = new LoanQuery(LoanEntity, 'loan');
