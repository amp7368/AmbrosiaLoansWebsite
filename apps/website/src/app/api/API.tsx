import { RequestBuilder } from './RequestBuilder';
import settings from '../settings.json';
import { LoginRequest } from '@api/io-model';
export module API {
    export function newRequest(): RequestBuilder {
        return new RequestBuilder(settings.apiUrl);
    }
    export function login(login: LoginRequest): RequestBuilder {
        return new RequestBuilder(settings.apiUrl + '/auth/login').config(
            'auth',
            login
        );
    }
}
