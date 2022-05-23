import { ClientProfileBase } from '@api/io-model';
import { getManager } from 'typeorm';

import { AmbrosiaQuery } from '../../AmbrosiaQuery';
import { ClientEntity } from './Client.entity';

export class UserAccountQuery extends AmbrosiaQuery {
    async getClients(): Promise<ClientEntity[]> {
        return await this.managerQueryBuilder(ClientEntity, 'user').getMany();
    }
    async newClient(
        client: Omit<ClientProfileBase, 'uuid'>
    ): Promise<ClientEntity> {
        const entity: ClientEntity = ClientEntity.create(client);
        return await getManager().save(entity);
    }
}

export const clientQuery = new UserAccountQuery();
