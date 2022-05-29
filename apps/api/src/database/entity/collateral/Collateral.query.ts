import { Collateral, CollateralCreateRequest } from '@api/io-model';
import { Body } from '@nestjs/common';
import { getManager } from 'typeorm';
import { AmbrosiaQuery } from '../../AmbrosiaQuery';
import { CollateralEntity } from './Collateral.entity';

export class CollateralQuery extends AmbrosiaQuery {
    async findByIds(ids: string[]): Promise<CollateralEntity[]> {
        return await getManager().findByIds(CollateralEntity, ids);
    }
    async newCollateral(
        client: CollateralCreateRequest
    ): Promise<CollateralEntity> {
        const entity = CollateralEntity.create(client);
        return await getManager().save(CollateralEntity, entity);
    }
}
export const collateralQuery = new CollateralQuery();
