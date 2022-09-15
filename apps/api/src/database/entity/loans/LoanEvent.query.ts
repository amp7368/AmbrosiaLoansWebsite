import {
    LoanEvent,
    LoanEventCreateRequest,
    LoanEventSimple,
} from 'libs/api-iomodel/src/api/loan-event';
import { getManager } from 'typeorm';

import { AmbrosiaQuery } from '../../AmbrosiaQuery';
import { collateralQuery } from '../collateral/Collateral.query';
import { EntityTables } from '../EntityTables';
import { LoanEventEntity } from './LoanEvent.entity';

export class LoanEventQuery extends AmbrosiaQuery<LoanEventEntity> {
    async create(request: LoanEventCreateRequest) {
        const collateral = request.event.collateral
            ? await collateralQuery.findOne(request.event.collateral)
            : undefined;
        const entity: LoanEventEntity = LoanEventEntity.create({
            date: new Date(),
            ...request.event,
            collateral,
        });
        return await this.save(entity);
    }
    toSimple(entity: LoanEventEntity): LoanEventSimple {
        return { ...entity, collateral: entity.collateral?.uuid };
    }
}
export const loanEventQuery = new LoanEventQuery(LoanEventEntity, 'loanevent', [
    'loan',
    'collateral',
]);
