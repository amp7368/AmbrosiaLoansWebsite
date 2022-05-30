import {
    AmbrosiaException,
    AmbrosiaResponse,
    AmbrosiaResponseOK,
    okResponse,
} from '@api/io-model';
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
    private body: any = {};
    private requestMethod: RequestMethod = RequestMethod.Get;
    private configData: AxiosRequestConfig = {};
    constructor(baseUrl: string) {
        this.urlField.push(baseUrl);
        this.url = this.url.bind(this);
        this.queryParam = this.queryParam.bind(this);
        this.payload = this.payload.bind(this);
        this.setMethod = this.setMethod.bind(this);
        this.build = this.build.bind(this);
        this.serializeQueryParams = this.serializeQueryParams.bind(this);
        this.buildUrl = this.buildUrl.bind(this);
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
    queryParam(key: string, val: string): RequestBuilder {
        this.queryParams.push({ key: key, val: val });
        return this;
    }
    payload(payload: any): RequestBuilder {
        this.body = payload;
        return this;
    }
    setMethod(method: RequestMethod) {
        this.requestMethod = method;
        return this;
    }
    async build<T extends AmbrosiaResponse>(): Promise<T | AmbrosiaException> {
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
        url = `${url}?${params}`;
        return {
            method: this.requestMethod,
            url,
            data: this.body,
            ...this.configData,
        };
    }
}
