import { LoginRequest, LoginResponse, okResponse } from '@api/io-model';
import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { Role, Roles } from '../../../auth/Role';

import { Session } from '../../../auth/session/Session';
import { sessionStore } from '../../../auth/session/SessionStorage';
import { ControllerBase } from '../../base/ControllerBase';
import { EndpointUrls } from '../../EndpointUrls';

@Controller(EndpointUrls.api.auth.login.url)
@Roles(Role.Public)
export class LoginController extends ControllerBase {
    @Get()
    async login(
        @Headers() headers: { authorization: string }
    ): Promise<LoginResponse> {
        if (!headers) this.exception.badRequest(headers);
        const header: string = headers.authorization;
        const starting = 'Basic ';
        const headerIsValid = !header || !header.startsWith(starting);
        if (headerIsValid) this.exception.badRequest(headers);
        const encoded: string = header.substring(starting.length);
        const encodedBuffer: Buffer = Buffer.from(encoded, 'base64');
        const decoded: string[] = encodedBuffer.toString().split(':');
        if (decoded.length != 2) this.exception.badRequest(headers);

        this.validateGoodLogin({ username: decoded[0], password: decoded[1] });
        const session: Session = sessionStore.newSession();
        return { session, ...okResponse };
    }
}
