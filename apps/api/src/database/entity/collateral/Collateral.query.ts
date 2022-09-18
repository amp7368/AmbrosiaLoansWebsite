import {
    Collateral,
    CollateralCreateRequest,
    CollateralSimple,
} from '@api/io-model';

import { AmbrosiaQuery } from '../../AmbrosiaQuery';
import { CollateralEntity } from './Collateral.entity';

export class CollateralQuery extends AmbrosiaQuery<CollateralEntity> {
    toSimple(entity: CollateralEntity): CollateralSimple {
        return { ...entity };
    }
    async create(client: CollateralCreateRequest): Promise<CollateralEntity> {
        const entity = CollateralEntity.create({
            ...client,
            depositDate: new Date(),
        });
        return await this.save(entity);
    }
}
export const collateralQuery = new CollateralQuery(
    CollateralEntity,
    'collateral'
);
