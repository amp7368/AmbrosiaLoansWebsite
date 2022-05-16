import { LoginRequest, SessionBase } from '@api/io-model';
import { sessionStore } from '../../database/session/SessionStorage';
import { ExceptionFactory } from './ExceptionFactory';

export class ControllerBase {
    protected exception: ExceptionFactory = ExceptionFactory.instance;
    validateExists(request: unknown) {
        if (!request) this.exception.badRequest(request);
    }
    validateSession({ sessionToken }: { sessionToken: string }) {
        if (!sessionToken) throw this.exception.badRequest({ sessionToken });
        const isValid = sessionStore.isSessionValid(sessionToken);
        if (!isValid) throw this.exception.badSession();
    }
    validateGoodLogin(credentials: LoginRequest) {
        if (
            credentials.password !== 'appleptr16' ||
            credentials.username !== 'appleptr16'
        )
            this.exception.loginBadCredentials();
    }
}
