import { Optional } from '@appleptr16/utilities';
import { StoreConfig } from '@datorama/akita';

import { ReflexiveFn, StoreBase } from '../StoreBase';
import { Profile } from '../user/Profile.model';
import { SelfUser } from './SelfUser.model';
import { Session } from './Session.model';

@StoreConfig({ name: 'selfuser' })
export class SelfUserStore extends StoreBase<SelfUser> {
    setSession(session: Optional<Session>) {
        if (session) {
            session = {
                sessionToken: session.sessionToken,
                expiration: new Date(session.expiration),
            };
        }
        this.update((selfUser: SelfUser) => ({ ...selfUser, session }));
    }
    setProfile(profile: Optional<Profile>) {
        this.update((selfUser: SelfUser) => ({ ...selfUser, profile }));
    }
}

export const selfUserStore: SelfUserStore = new SelfUserStore({} as SelfUser);
