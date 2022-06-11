import { Module } from '@nestjs/common';
import { ClientController } from './client/Client.controller';
import { CollateralController } from './loan/Collateral.controller';
import { LoanController } from './loan/Loan.controller';

@Module({
    controllers: [ClientController, CollateralController, LoanController],
})
export class BaseModule {}
