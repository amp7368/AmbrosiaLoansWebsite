import {
    AmbrosiaException,
    AmbrosiaResponse,
    AmbrosiaResponseOK,
    okResponse,
} from '@api/io-model';
import { Optional } from '@appleptr16/utilities';
import { HttpStatus } from '@nestjs/common';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { StatusCodes } from 'http-status-codes';

export enum RequestMethod {
    Get = 'get',
    Post = 'post',
}
export interface RequestParam {
    key: string;
    val: string;
}

export class RequestBuilder {
    private urlField: string[] = [];
    private queryParams: RequestParam[] = [];
    private body: unknown = {};
    private requestMethod: RequestMethod = RequestMethod.Get;
    private configData: AxiosRequestConfig = {};
    constructor(baseUrl: string) {
        this.urlField.push(baseUrl);
    }
    url(url: string, ...additionalURL: string[]): RequestBuilder {
        this.urlField.push(url);
        for (const additionUrl of additionalURL) {
            this.urlField.push(additionUrl);
        }
        return this;
    }
    config<Key extends keyof AxiosRequestConfig>(
        key: Key,
        value: AxiosRequestConfig[Key]
    ): this {
        this.configData[key] = value;
        return this;
    }
    setConfig(config: AxiosRequestConfig): this {
        this.configData = config;
        return this;
    }
    addHeader(headers: AxiosRequestConfig['headers']): this {
        this.configData = {
            ...this.configData,
            headers: { ...this.configData.headers, ...headers },
        };
        return this;
    }
    queryParam(key: string, val: string): this {
        this.queryParams.push({ key: key, val: val });
        return this;
    }
    payload(payload: any): this {
        this.body = payload;
        return this;
    }
    setMethod(method: RequestMethod): this {
        this.requestMethod = method;
        return this;
    }
    async build<T extends AmbrosiaResponse | AmbrosiaException>(): Promise<T> {
        return axios(this.buildConfig())
            .then(convertResponse)
            .catch(convertError);
    }
    async buildForm(form: FormData) {
        return axios
            .post(this.buildUrl(), form, this.configData)
            .then(convertResponse)
            .catch(convertError);
    }

    private buildConfig(): AxiosRequestConfig {
        const config = {
            method: this.requestMethod,
            url: this.buildUrl(),
            data: this.body ?? null,
            ...this.configData,
        };
        console.log(config);
        return config;
    }
    private buildUrl(): string {
        let url: string = this.urlField.join('/');
        const params: string = this.queryParams
            .map((param) => `${param.key}=${param.val}`)
            .join('&');

        if (params) url += '?' + params;
        return url;
    }
}
function convertResponse(response: AxiosResponse<any, any>): AmbrosiaResponse {
    const status = response.status;
    return { ...response.data, status, isOk: isOk(status) };
}
function convertError(error: any) {
    const response = error.response;
    const status = response.status;
    return { ...response.data, status, isOk: isOk(status) };
}
function isOk(status: StatusCodes) {
    return status === StatusCodes.OK || status === StatusCodes.CREATED;
}
