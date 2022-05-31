import { AmbrosiaException, LoginRequest, LoginResponse } from '@api/io-model';
import { tap } from 'rxjs';
import { map } from 'rxjs';

import { API } from '../../api/API';
import { AppQuery } from '../base/AppQuery';
import { SelfUserState, selfUserStore } from './SelfUser.store';

export class SelfUserQuery extends AppQuery<SelfUserState> {
    async login(
        login: LoginRequest
    ): Promise<LoginResponse | AmbrosiaException> {
        const response = await API.login(login);

        if (response.isOk) {
            const session = response.session;
            session.expiration = new Date(session.expiration);
            this.appStore.setProp('session', session);
        }
        return response;
    }
    session$ = this.select().pipe(map((user) => user.session));
    isLoggedIn$ = this.session$.pipe(
        map((session) =>
            session ? new Date(session.expiration) > new Date() : false
        )
    );
}
export const selfUserQuery = new SelfUserQuery(selfUserStore);
