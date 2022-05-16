import { LoginRequest, LoginResponse, okResponse } from '@api/io-model';
import { Body, Controller, Post } from '@nestjs/common';

import { Session } from '../../../database/session/Session';
import { sessionStore } from '../../../database/session/SessionStorage';
import { ControllerBase } from '../../base/ControllerBase';
import { EndpointUrls } from '../../EndpointUrls';

@Controller(EndpointUrls.auth.login.url)
export class LoginController extends ControllerBase {
    @Post()
    async login(@Body() credentials: LoginRequest): Promise<LoginResponse> {
        this.validateExists(credentials);
        this.validateGoodLogin(credentials);
        const session: Session = sessionStore.newSession();
        return { session, ...okResponse };
    }
}
