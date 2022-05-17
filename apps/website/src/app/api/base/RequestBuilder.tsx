import { AmbrosiaException, AmbrosiaResponse, okResponse } from '@api/io-model';
import axios, { AxiosRequestConfig, Method } from 'axios';

export interface RequestParam {
    key: string;
    val: string;
}

export class RequestBuilder {
    private urlField: string[] = [];
    private queryParams: RequestParam[] = [];
    private body: any = {};
    private requestMethod: Method;
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
    queryParam(key: string, val: string): RequestBuilder {
        this.queryParams.push({ key, val });
        return this;
    }
    payload(payload: any): RequestBuilder {
        this.body = payload;
        return this;
    }
    setMethod(method: Method) {
        this.requestMethod = method;
        return this;
    }
    asPost() {
        return this.setMethod('post');
    }
    asGet() {
        return this.setMethod('get');
    }
    async build(): Promise<AmbrosiaResponse & any> {
        return axios(this.buildUrl())
            .then((response) => {
                return { ...okResponse, ...response.data };
            })
            .catch((error) => {
                console.error(error);
                return {
                    isOk: false,
                    status: error.status,
                    ...error,
                } as AmbrosiaException;
            });
    }

    private serializeQueryParams(param: RequestParam) {
        return `${param.key}=${param.val}`;
    }

    private buildUrl() {
        const params: string = this.queryParams
            .map((queryParam) => this.serializeQueryParams(queryParam))
            .join('&');
        const url = `${this.urlField.join('/')}?${params}`;
        return {
            method: this.requestMethod,
            url,
            data: this.body,
        } as AxiosRequestConfig;
    }
}
