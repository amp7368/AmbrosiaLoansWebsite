import {
    AuthorizedRequest,
    ClientCreateRequest,
    ClientCreateResponse,
    ClientListRequest,
    ClientListResponse,
} from '@api/io-model';
import { v4 } from 'uuid';
import { selfUserQuery } from '../../model/session/SelfUser.query';

import { BaseAPI } from '../base/BaseAPI';

export class ClientApi extends BaseAPI {
    async clientList(): Promise<ClientListResponse> {
        return await this.newRequest()
            .url('client', 'list')
            .asGet()
            .payload(this.authorize({}))
            .build();
    }
    async clientCreate(
        props: Exclude<ClientCreateRequest, AuthorizedRequest>
    ): Promise<ClientCreateResponse> {
        return await this.newRequest()
            .url('client', 'create')
            .asPost()
            .payload(this.authorize(props))
            .build();
    }
}
export const clientApi: ClientApi = new ClientApi();
