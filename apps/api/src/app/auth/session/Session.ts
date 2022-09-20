import { Role, SessionBase } from '@api/io-model';
import { DateFactory } from '@appleptr16/utilities';
import { v4 } from 'uuid';

export class Session implements SessionBase {
    static EXPIRATION_MINS = 60;

    sessionToken: string = v4();
    expiration: Date;
    role: Role;

    constructor(role: Role) {
        this.role = role;
        this.refresh();
    }

    refresh() {
        if (!this.isValid()) return false;
        this.expiration = DateFactory.fromNowMinutes(Session.EXPIRATION_MINS);
        return true;
    }

    isValid(): boolean {
        return new Date() <= this.expiration;
    }
}
