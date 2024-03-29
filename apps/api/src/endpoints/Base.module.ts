import { Module } from '@nestjs/common';
import { ClientController } from './client/Client.controller';
import { CollateralController } from './collateral/Collateral.controller';
import { InvestEventController } from './investment/InvestEvent.controller';
import { InvestmentController } from './investment/Investment.controller';
import { LoanController } from './loan/Loan.controller';

@Module({
    controllers: [
        ClientController,
        CollateralController,
        LoanController,
        InvestEventController,
        InvestmentController,
    ],
})
export class BaseModule {}
