import { LoginRequest, SessionBase } from '@api/io-model';
import { sessionStore } from '../../auth/session/SessionStorage';
import { ExceptionFactory } from './ExceptionFactory';

export class ControllerBase {
    protected exception: ExceptionFactory = ExceptionFactory.instance;
    validateExists(request: unknown) {
        if (!request) this.exception.badRequest(request);
    }

    validateGoodLogin(credentials: LoginRequest) {
        if (
            credentials.password !== 'appleptr16' ||
            credentials.username !== 'appleptr16'
        )
            this.exception.loginBadCredentials();
    }
}
