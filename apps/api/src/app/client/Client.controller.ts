import {
    ClientCreateRequestRuntime,
    ClientCreateResponse,
    ClientListResponse,
    ClientSimple,
    okResponse,
} from '@api/io-model';
import { Body, Controller, Get, Post } from '@nestjs/common';

import { ClientEntity } from './Client.entity';
import { clientQuery } from './Client.query';
import { ControllerBase } from '../base/ControllerBase';
import { EndpointUrls } from '../EndpointUrls';
import { Optional } from '@appleptr16/utilities';

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
        const entity: Optional<ClientEntity> = await clientQuery.create(
            request.client
        );
        if (!entity) this.exception.conflict('Username already taken');
        const client: ClientSimple = clientQuery.toSimple(entity);
        return { client, ...okResponse };
    }
}
