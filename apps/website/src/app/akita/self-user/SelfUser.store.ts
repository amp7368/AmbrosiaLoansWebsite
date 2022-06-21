import { SessionBase } from '@api/io-model';
import { Optional } from '@appleptr16/utilities';
import { StoreConfig } from '@datorama/akita';

import { AppStore } from '../base/AppStore';

export type SelfUserState = {
    session: Optional<SessionBase>;
    broker: { displayName: string };
    currentClient: { uuid: string };
};
@StoreConfig({ name: 'selfUser' })
export class SelfUserStore extends AppStore<SelfUserState> {}
export const selfUserStore = new SelfUserStore({
    session: undefined,
    broker: { displayName: 'Tealycraft' },
});
