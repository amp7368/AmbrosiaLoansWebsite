import {
    Collateral,
    CreateLoan,
    LoanEventType,
    LoanSimple,
} from '@api/io-model';

import { AmbrosiaQuery } from '../AmbrosiaQuery';
import { ClientEntity } from '../client/Client.entity';
import { collateralQuery } from '../collateral/Collateral.query';
import { LoanEntity } from './Loan.entity';
import { LoanEventEntity } from './LoanEvent.entity';
import { loanEventQuery } from './LoanEvent.query';

export class LoanQuery extends AmbrosiaQuery<LoanEntity> {
    toSimple(loan: LoanEntity): LoanSimple {
        return {
            ...loan,
            client: (loan.client as any as ClientEntity).uuid,
            history: loan.history?.map((pay) => pay.uuid),
        };
    }
    async create(loan: CreateLoan): Promise<LoanEntity> {
        const loanEntity: LoanEntity = await this.save(
            LoanEntity.create({
                ...loan,
                currentLoan: loan.amountLoaned,
            })
        );
        const collateralToEvent = (collateral: Collateral) =>
            LoanEventEntity.create({
                date: loan.date,
                eventType: LoanEventType.Create,
                emeraldChange: 0,
                loan: loanEntity,
                collateral,
            });

        const eventPreEntities: Promise<LoanEventEntity>[] =
            loan.collateral.map((uuid) =>
                collateralQuery
                    .findOne(uuid)
                    .then((entity) => collateralToEvent(entity))
                    .then((entity) => loanEventQuery.save(entity))
            );
        eventPreEntities.push(
            loanEventQuery.save(
                LoanEventEntity.create({
                    date: loan.date,
                    eventType: LoanEventType.Create,
                    emeraldChange: loan.amountLoaned,
                    loan: loanEntity,
                    collateral: undefined,
                })
            )
        );
        await Promise.all(eventPreEntities);
        return await this.findOne(loanEntity.uuid);
    }
}
export const loanQuery: LoanQuery = new LoanQuery(LoanEntity, 'loan', [
    'history',
    'client',
]);
