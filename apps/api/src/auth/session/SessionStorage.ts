import { DateFactory } from '@appleptr16/utilities';

import { Session } from './Session';

export class SessionStore {
    private sessions: Map<string, Session> = new Map();
    private nextTrimTime: Date = new Date();
    constructor() {
        this.isSessionValid = this.isSessionValid.bind(this);
        this.newSession = this.newSession.bind(this);
    }
    verifyTrimmed() {
        if (this.nextTrimTime > new Date()) return;
        this.nextTrimTime = DateFactory.fromNowMinutes(1);
        this.sessions.forEach((session, key, map) => {
            if (!session.isValid()) map.delete(key);
        });
    }
    newSession(): Session {
        this.verifyTrimmed();
        const session = new Session();
        this.sessions.set(session.sessionToken, session);
        return session;
    }
    isSessionValid(sessionToken: string): boolean {
        this.verifyTrimmed();
        const session: Session = this.sessions.get(sessionToken);
        if (!session) return false;
        return session.isValid();
    }
}

export const sessionStore = new SessionStore();
