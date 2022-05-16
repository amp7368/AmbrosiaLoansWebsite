import { LoginRequest, LoginResponse } from '@api/io-model';

import { authAPI } from '../../api/auth/AuthApi';
import { selfUserStore } from './SelfUser.store';

export class SessionService {
    async logout() {
        selfUserStore.setSession(undefined);
    }
    async login(request: LoginRequest): Promise<LoginResponse> {
        const response: LoginResponse = await authAPI.login(request);
        this.authPost(response);
        return response;
    }
    private authPost(response: LoginResponse) {
        if (response?.session) selfUserStore.setSession(response.session);
    }
}
export const sessionService = new SessionService();
