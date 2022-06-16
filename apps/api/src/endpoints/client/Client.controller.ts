import {
    ClientCreateRequestRuntime,
    ClientCreateResponse,
    ClientListResponse,
    ClientSimple,
    okResponse,
} from '@api/io-model';
import { Body, Controller, Get, Post } from '@nestjs/common';

import { Role, Roles } from '../../auth/Role';
import { ClientEntity } from '../../database/entity/client/Client.entity';
import { clientQuery } from '../../database/entity/client/Client.query';
import { ControllerBase } from '../base/ControllerBase';
import { EndpointUrls } from '../EndpointUrls';

@Controller(EndpointUrls.api.client.url)
export class ClientController extends ControllerBase {
    @Get('list')
    async list(): Promise<ClientListResponse> {
        const entities: ClientEntity[] = await clientQuery.list();
        const clients: ClientSimple[] = entities.map(clientQuery.toSimple);
        return { clients, ...okResponse };
    }
    @Post('create')
    async createClient(
        @Body() request: ClientCreateRequestRuntime
    ): Promise<ClientCreateResponse> {
        const entity = await clientQuery.create(request.client);
        const client = clientQuery.toSimple(entity);
        return { client, ...okResponse };
    }
}
