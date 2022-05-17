import { AuthorizedRequest } from '@api/io-model';

import { selfUserQuery } from '../../model/session/SelfUser.query';
import { RequestBuilder } from './RequestBuilder';

export class BaseAPI {
    private readonly BASE = 'http://localhost:80';

    newRequest(): RequestBuilder {
        return new RequestBuilder(this.BASE);
    }
    isStatusOk(status: number): boolean {
        return status === 200;
    }
    authorize(payload: {}): AuthorizedRequest | undefined {
        const sessionToken = selfUserQuery.getSessionToken();
        if (!sessionToken) return undefined;
        return {
            ...payload,
            sessionToken,
        };
    }
}
