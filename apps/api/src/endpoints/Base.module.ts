import { Module } from '@nestjs/common';
import { ClientController } from './client/Client.controller';
import { CollateralController } from './loan/Collateral.controller';
import { LoanController } from './loan/Loan.controller';
import { LoanPaybackController } from './loan/LoanPayback.controller';

@Module({
    controllers: [
        ClientController,
        CollateralController,
        LoanController,
        LoanPaybackController,
    ],
})
export class BaseModule {}
