import { RequestBuilder, RequestMethod } from './RequestBuilder';
import settings from '../settings.json';
import {
    AmbrosiaException,
    ClientCreateRequest,
    ClientCreateResponse,
    ClientListResponse,
    LoginRequest,
    LoginResponse,
} from '@api/io-model';
import { selfUserQuery } from '../akita/self-user/SelfUser.query';
import { ClientRequest } from 'http';
import { Optional } from '@appleptr16/utilities';
import { StatusCodes } from 'http-status-codes';
export module API {
    function request(url: string): RequestBuilder {
        return new RequestBuilder(settings.apiUrl + url);
    }
    export function get(url: string): RequestBuilder {
        return request(url).setMethod(RequestMethod.Get);
    }
    export function post(url: string): RequestBuilder {
        return request(url).setMethod(RequestMethod.Post);
    }
    export function authorize(request: RequestBuilder): RequestBuilder {
        const token = selfUserQuery.getValue().session?.sessionToken;
        if (!token)
            return request.returnWith({
                status: StatusCodes.NOT_ACCEPTABLE,
                isOk: false,
                message: 'no session token',
                token,
            } as AmbrosiaException);
        return request.addHeader({
            authorization: `Bearer ${token}`,
        });
    }
    export async function login(
        login: LoginRequest
    ): Promise<LoginResponse | AmbrosiaException> {
        return await get('/auth/login').config('auth', login).build();
    }
    export async function clientList(): Promise<
        ClientListResponse | AmbrosiaException
    > {
        return await authorize(get('/client/list')).build();
    }
    export async function clientCreate(
        request: ClientCreateRequest
    ): Promise<ClientCreateResponse | AmbrosiaException> {
        return await authorize(post('/client/create')).payload(request).build();
    }
}
