import { ILoginId } from '@api/io-model';

import { ClientProfile } from '../../../database/entity/client/Client.entity';
import { userAccountQuery } from '../../../database/entity/client/Client.query';
import { Session } from '../../../database/session/Session';
import { sessionStore } from '../../../database/session/SessionStorage';

export class AuthService {
    async getUser(credentials: ILoginId): Promise<ClientProfile> {
        return userAccountQuery.getUser(credentials.username);
    }

    async hasUser(credentials: ILoginId): Promise<boolean> {
        return this.getUser(credentials)
            .then((user: ClientProfile) => !!user)
            .catch(() => false);
    }

    async newUser(signup: any): Promise<ClientProfile> {
        return userAccountQuery.newUser(signup);
    }
    async newSession(signup: any): Promise<Session> {
        return this.newUser(signup).then(sessionStore.newSession);
    }
}
