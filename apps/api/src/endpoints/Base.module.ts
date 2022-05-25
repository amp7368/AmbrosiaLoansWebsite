import { Module } from '@nestjs/common';
import { ClientController } from './client/Client.controller';
import { CollateralController } from './collateral/Collateral.controller';

@Module({ controllers: [ClientController, CollateralController] })
export class BaseModule {}
