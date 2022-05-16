import { ClientProfileBase } from '@api/io-model';
import { getManager } from 'typeorm';

import { AmbrosiaQuery } from '../../AmbrosiaQuery';
import { ClientProfile } from './Client.entity';

export class UserAccountQuery extends AmbrosiaQuery {
    async getClients(): Promise<ClientProfile[]> {
        return await this.managerQueryBuilder(ClientProfile, 'user').getMany();
    }
    async newClient(
        client: Omit<ClientProfileBase, 'uuid'>
    ): Promise<ClientProfile> {
        const entity: ClientProfile = ClientProfile.create(client);
        return await getManager().save(entity);
    }
}

export const clientQuery = new UserAccountQuery();
