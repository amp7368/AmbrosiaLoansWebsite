import { apiLoginFactory, LoginRequest, LoginResponse } from '@api/io-model';
import { Body, Controller, Post } from '@nestjs/common';

import { ClientProfile } from '../../../../database/entity/client/Client.entity';
import { Session } from '../../../../database/session/Session';
import { sessionStore } from '../../../../database/session/SessionStorage';
import { ControllerBase } from '../../../base/ControllerBase';
import { EndpointUrls } from '../../../EndpointUrls';
import { AuthService } from '../auth.service';
import { ValidateLogin } from './ValidateLogin';

@Controller(EndpointUrls.user.auth.login.url)
export class LoginController extends ControllerBase<ValidateLogin> {
    constructor(private authService: AuthService, validator: ValidateLogin) {
        super(validator);
    }

    @Post()
    async login(
        @Body() credentials: LoginRequest['output']
    ): LoginResponse['promise'] {
        this.validator.validateGoodLogin(credentials);
        const session: Session = sessionStore.newSession();
        return apiLoginFactory.response(session);
    }
}
