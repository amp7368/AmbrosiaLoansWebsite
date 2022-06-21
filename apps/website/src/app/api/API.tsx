import {
    AmbrosiaException,
    ClientCreateRequest,
    ClientCreateResponse,
    ClientListResponse,
    LoanCreateRequest,
    LoanCreateResponse,
    LoanListResponse,
    LoginRequest,
    LoginResponse,
} from '@api/io-model';
import { StatusCodes } from 'http-status-codes';

import { selfUserQuery } from '../akita/self-user/SelfUser.query';
import settings from '../settings.json';
import { RequestBuilder, RequestMethod } from './RequestBuilder';

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
    export async function login(login: LoginRequest): Promise<LoginResponse> {
        return await get('/auth/login').config('auth', login).build();
    }
    export async function clientList(): Promise<ClientListResponse> {
        return await authorize(get('/client/list')).build();
    }
    export async function clientCreate(
        request: ClientCreateRequest
    ): Promise<ClientCreateResponse> {
        return await authorize(post('/client/create')).payload(request).build();
    }
    export async function loanList(): Promise<LoanListResponse> {
        return await authorize(get('/loan/list')).build();
    }
    export async function loanCreate(
        request: LoanCreateRequest
    ): Promise<LoanCreateResponse> {
        console.log(request);
        return await authorize(post('/loan/create')).payload(request).build();
    }
}
