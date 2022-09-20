import { LoginRequest, LoginResponse, okResponse, Role } from '@api/io-model';
import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { Roles } from '../../auth/Role';

import { Session } from '../session/Session';
import { sessionStore } from '../session/SessionStorage';
import { ControllerBase } from '../../base/ControllerBase';
import { EndpointUrls } from '../../EndpointUrls';
import { trimAuthorizationHeader } from '../trimAuthorizationHeader';

@Controller(EndpointUrls.api.auth.login.url)
@Roles(Role.Public)
export class LoginController extends ControllerBase {
    @Get()
    async login(
        @Headers() headers: { authorization: string }
    ): Promise<LoginResponse> {
        const encoded = trimAuthorizationHeader('Basic ', { headers });
        const decoded: string[] = Buffer.from(encoded, 'base64')
            .toString()
            .split(':');
        if (decoded.length != 2) this.exception.badRequest(headers);
        const [username, password] = decoded;
        const role: Role = this.validateGoodLogin({ username, password });
        const session: Session = sessionStore.newSession(role);
        return { session, ...okResponse };
    }
    validateGoodLogin(credentials: LoginRequest): Role {
        if (this.credentialsMatch(credentials, 'appleptr16'))
            return Role.Client;
        if (this.credentialsMatch(credentials, 'staff')) return Role.Staff;
        if (this.credentialsMatch(credentials, 'admin')) return Role.Admin;
        throw this.exception.loginBadCredentials();
    }
    private credentialsMatch(attempt: LoginRequest, success: string) {
        return attempt.password === success && attempt.username === success;
    }
}
