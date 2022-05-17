import { Optional } from '@appleptr16/utilities';

import { Client } from '../user/Client.model';
import { Session } from './Session.model';

export interface SelfUser {
    profile: Optional<Client>;
    session: Optional<Session>;
}
