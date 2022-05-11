import { ILoginId, ServerProfileBase, SignupRequest } from '@api/io-model';
import { Optional } from '@appleptr16/utilities';

import { ClientProfile } from '../../../database/entity/client/Client.entity';
import { Session } from '../../../database/session/Session';
import { sessionStore } from '../../../database/session/SessionStorage';
import { userAccountQuery } from '../../../database/entity/client/Client.query';

export class AuthService {
    async getUser(credentials: ILoginId): Promise<ClientProfile> {
        return userAccountQuery.getUser(credentials.username);
    }

    async hasUser(credentials: ILoginId): Promise<boolean> {
        return this.getUser(credentials)
            .then((user: ClientProfile) => !!user)
            .catch(() => false);
    }

    async newUser(signup: SignupRequest['output']): Promise<ClientProfile> {
        return userAccountQuery.newUser(signup);
    }
    async newSession(signup: SignupRequest['output']): Promise<Session> {
        return this.newUser(signup).then(sessionStore.newSession);
    }
}
