import { apiLoginFactory, LoginRequest, LoginResponse } from '@api/io-model';
import { v4 } from 'uuid';

import { BaseAPI } from '../base/BaseAPI';
import { RequestMethod } from '../base/RequestBuilder';

export class AuthAPI extends BaseAPI {
    async login(props: LoginRequest['input']): LoginResponse['promise'] {
        return this.newRequest()
            .url('user', 'auth', 'login')
            .setMethod(RequestMethod.Post)
            .payload(props)
            .build();
    }
}
export const authAPI = new AuthAPI();
