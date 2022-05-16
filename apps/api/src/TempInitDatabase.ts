import { Module, OnApplicationBootstrap } from '@nestjs/common';

import { ClientService } from './endpoints/client/Client.service';

@Module({
    imports: [],
    providers: [ClientService],
})
export class TempInitDatabase {
    constructor(private authService: ClientService) {}
}
