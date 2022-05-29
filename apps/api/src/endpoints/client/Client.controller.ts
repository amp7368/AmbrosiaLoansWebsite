import {
    ClientCreateRequestRuntime,
    ClientCreateResponse,
    ClientListResponse,
    okResponse,
} from '@api/io-model';
import { Body, Controller, Get, Post } from '@nestjs/common';

import { Role, Roles } from '../../auth/Role';
import { clientQuery } from '../../database/entity/client/Client.query';
import { ControllerBase } from '../base/ControllerBase';
import { EndpointUrls } from '../EndpointUrls';

@Controller(EndpointUrls.api.client.url)
@Roles(Role.Admin)
export class ClientController extends ControllerBase {
    @Get('list')
    async getClient(): Promise<ClientListResponse> {
        return clientQuery
            .getClients()
            .then((clients) => ({ clients, ...okResponse }));
    }
    @Post('create')
    async createClient(
        @Body() request: ClientCreateRequestRuntime
    ): Promise<ClientCreateResponse> {
        return clientQuery
            .newClient(request.client)
            .then((client) => ({ client, ...okResponse }));
    }
}
