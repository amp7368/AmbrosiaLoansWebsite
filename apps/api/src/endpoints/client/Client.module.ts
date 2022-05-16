import { Module } from '@nestjs/common';
import { ClientController } from './Client.controller';

@Module({ controllers: [ClientController] })
export class ClientModule {}
