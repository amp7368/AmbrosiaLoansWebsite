import { ILoginId } from '@api/io-model';
import { ValidateBase } from '../../../base/ValidateBase';
import {
    authExceptionFactory,
    AuthExceptionFactory,
} from '../AuthExceptionFactory';
import { ClientProfile } from '../../../../database/entity/client/Client.entity';
export class ValidateLogin extends ValidateBase<AuthExceptionFactory> {
    validateGoodLogin(credentials: ILoginId, user: ClientProfile) {
        if (!user || user.credentials.password !== credentials.password)
            throw authExceptionFactory.loginBadCredentials();
    }
}
