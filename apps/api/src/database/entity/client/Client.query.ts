import { Client, ClientSimple } from '@api/io-model';
import { getManager } from 'typeorm';

import { AmbrosiaQuery } from '../../AmbrosiaQuery';
import { investmentQuery } from '../investment/Investment.query';
import { ClientEntity } from './Client.entity';

export class ClientQuery extends AmbrosiaQuery<ClientEntity> {
    toSimple(client: ClientEntity): ClientSimple {
        return { ...client };
    }
    async create(
        client: Omit<ClientSimple, 'uuid' | 'loans' | 'investments'>
    ): Promise<ClientEntity> {
        const entity: ClientEntity = ClientEntity.create(client);
        return await this.save(entity);
    }
}

export const clientQuery = new ClientQuery(ClientEntity, 'client');
