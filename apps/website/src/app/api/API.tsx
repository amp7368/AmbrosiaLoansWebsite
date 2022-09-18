import {
    AmbrosiaException,
    ClientCreateRequest,
    ClientCreateResponse,
    ClientListResponse,
    CollateralCreateRequest,
    CollateralResponse,
    InvestmentListResponse,
    LoanCreateRequest,
    LoanCreateResponse,
    LoanListResponse,
    LoginRequest,
    LoginResponse,
} from '@api/io-model';
import axios from 'axios';
import { createReadStream, read } from 'fs';
import { StatusCodes } from 'http-status-codes';
import {
    getSessionToken,
    selfUserStore,
} from '../elf/self-user/SelfUser.repository';
import { CollateralBuild } from '../elf/ui/CollateralUI';
import fs from 'fs';
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
        const token = getSessionToken();
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
    export async function investmentList(): Promise<InvestmentListResponse> {
        return await authorize(get('/investment/list')).build();
    }
    export async function loanList(): Promise<LoanListResponse> {
        return await authorize(get('/loan/list')).build();
    }
    export async function loanCreate(
        request: LoanCreateRequest
    ): Promise<LoanCreateResponse> {
        return await authorize(post('/loan/create')).payload(request).build();
    }
    export async function collateralCreate(request: CollateralBuild) {
        const response: CollateralResponse = await authorize(
            post('/collateral/create').payload(request)
        ).build();
        if (
            response.isOk &&
            'image' in request &&
            request.image &&
            request.image.length !== 0
        ) {
            const img = request.image[0];
            const form = new FormData();
            form.append('image', img, img.name);
            return await authorize(
                post('/collateral/image')
                    .addHeader({ 'Content-Type': 'multipart/form-data' })
                    .queryParam('uuid', response.collateral.uuid)
            ).buildForm(form);
        }
        return response;
    }
}
