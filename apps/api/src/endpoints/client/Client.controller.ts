import {
    AuthorizedRequest,
    ClientListRequest,
    ClientListResponse,
    ClientCreateRequest,
    ClientCreateResponse,
    okResponse,
} from '@api/io-model';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { clientQuery } from '../../database/entity/client/Client.query';
import { ControllerBase } from '../base/ControllerBase';
import { EndpointUrls } from '../EndpointUrls';

@Controller(EndpointUrls.api.client.url)
export class ClientController extends ControllerBase {
    @Post('list')
    async getClient(
        @Body() request: ClientListRequest
    ): Promise<ClientListResponse> {
        this.validateExists(request);
        this.validateSession(request);
        return clientQuery
            .getClients()
            .then((clients) => ({ clients, ...okResponse }));
    }
    @Post('create')
    async createClient(
        @Body() request: ClientCreateRequest
    ): Promise<ClientCreateResponse> {
        this.validateExists(request);
        this.validateSession(request);
        return clientQuery
            .newClient(request.client)
            .then((client) => ({ client, ...okResponse }));
    }
}
