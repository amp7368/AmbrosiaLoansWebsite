import { Client, ClientSimple, Investment } from '@api/io-model';
import { getManager } from 'typeorm';

import { AmbrosiaQuery } from '../../AmbrosiaQuery';
import { EntityTables } from '../EntityTables';
import { ClientEntity } from './Client.entity';

export class ClientQuery extends AmbrosiaQuery<ClientEntity> {
    toSimple(client: ClientEntity): ClientSimple {
        return {
            ...client,
            loans: client.loans?.map((loan) => loan.uuid),
            investments: client.investments?.map((invest) => invest.uuid),
        };
    }
    async create(
        client: Omit<ClientSimple, 'uuid' | 'loans' | 'investments'>
    ): Promise<ClientEntity> {
        const entity: ClientEntity = ClientEntity.create(client);
        return await this.save(entity);
    }
}

export const clientQuery = new ClientQuery(ClientEntity, EntityTables.Client, [
    'loans',
    'investments',
]);
