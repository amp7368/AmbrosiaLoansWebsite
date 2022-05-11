import { SignupRequest } from '@api/io-model';
import { getManager } from 'typeorm';

import { AmbrosiaQuery } from '../../AmbrosiaQuery';
import { ClientProfile } from './Client.entity';

export class UserAccountQuery extends AmbrosiaQuery {
    async getUser(username: string): Promise<ClientProfile> {
        return await this.managerQueryBuilder(ClientProfile, 'user')
            .where('user.credentials.username = :username', { username })
            .getOne();
    }
    async newUser(signup: SignupRequest['output']): Promise<ClientProfile> {
        const account: ClientProfile = ClientProfile.create({});
        return await getManager().save(account);
    }
}

export const userAccountQuery = new UserAccountQuery();
