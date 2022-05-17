import { LoginRequest, LoginResponse } from '@api/io-model';

import { BaseAPI } from '../base/BaseAPI';

export class AuthAPI extends BaseAPI {
    async login(props: LoginRequest): Promise<LoginResponse> {
        return this.newRequest()
            .url('auth', 'login')
            .asPost()
            .payload(props)
            .build();
    }
}
export const authAPI = new AuthAPI();
