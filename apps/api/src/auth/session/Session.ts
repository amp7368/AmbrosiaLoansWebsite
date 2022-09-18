import { SessionBase } from '@api/io-model';
import { DateFactory } from '@appleptr16/utilities';
import { v4 } from 'uuid';

export class Session implements SessionBase {
    static EXPIRATION_MINS = 60;

    sessionToken: string = v4();
    expiration: Date;

    constructor() {
        this.refresh();
    }

    refresh() {
        this.expiration = DateFactory.fromNowMinutes(Session.EXPIRATION_MINS);
    }

    isValid(): boolean {
        return new Date() <= this.expiration;
    }
}
