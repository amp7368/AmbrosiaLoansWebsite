import { Role } from '@api/io-model';
import { DateFactory, Optional } from '@appleptr16/utilities';

import { Session } from './Session';

export class SessionStore {
    private sessions: Map<string, Session> = new Map();
    private nextTrimTime: Date = new Date();

    verifyTrimmed() {
        if (this.nextTrimTime > new Date()) return;
        this.nextTrimTime = DateFactory.fromNowMinutes(1);
        this.sessions.forEach((session, key, map) => {
            if (!session.isValid()) map.delete(key);
        });
    }
    newSession(role: Role): Session {
        this.verifyTrimmed();
        const session = new Session(role);
        this.sessions.set(session.sessionToken, session);
        return session;
    }
    getSession(sessionToken: string): Optional<Session> {
        this.verifyTrimmed();
        const session: Session = this.sessions.get(sessionToken);
        if (!session || !session.refresh()) return undefined;
        return session;
    }
}

export const sessionStore = new SessionStore();
