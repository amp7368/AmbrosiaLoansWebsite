import { LoginRequest, LoginResponse } from '@api/io-model';

import { BaseAPI } from '../base/BaseAPI';
import { RequestMethod } from '../base/RequestBuilder';

export class AuthAPI extends BaseAPI {
    async login(props: LoginRequest): Promise<LoginResponse> {
        return this.newRequest()
            .url('auth', 'login')
            .setMethod(RequestMethod.Post)
            .payload(props)
            .build();
    }
}
export const authAPI = new AuthAPI();
