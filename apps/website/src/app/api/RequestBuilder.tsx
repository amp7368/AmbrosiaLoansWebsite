import {
    AmbrosiaException,
    AmbrosiaResponse,
    AmbrosiaResponseOK,
    okResponse,
} from '@api/io-model';
import { Optional } from '@appleptr16/utilities';
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
    private returnWithVal: Optional<AmbrosiaResponse> = undefined;
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
    returnWith(returnWithVal: AmbrosiaResponse): this {
        this.returnWithVal = returnWithVal;
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
        return axios(this.buildUrl())
            .then((response: AxiosResponse<any, any>): AmbrosiaResponse => {
                const status = response.status;
                return {
                    ...response.data,
                    status,
                    isOk: status === StatusCodes.OK,
                };
            })
            .catch((error) => {
                const response = error.response;
                const status = response.status;
                return {
                    ...response.data,
                    status,
                    isOk: status === StatusCodes.OK,
                };
            });
    }

    private serializeQueryParams(param: RequestParam) {
        return `${param.key}=${param.val}`;
    }

    private buildUrl(): AxiosRequestConfig {
        let url: string = this.urlField.join('/');
        const params: string = this.queryParams
            .map((queryParam) => this.serializeQueryParams(queryParam))
            .join('&');

        if (params) url += '?' + params;
        return {
            method: this.requestMethod,
            url,
            data: this.body ?? null,
            ...this.configData,
        };
    }
}
