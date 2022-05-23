import { InitDb } from '../InitDb';
import { BrokerEntity } from './broker/Broker.entity';
import { ClientEntity } from './client/Client.entity';
import { CollateralEntity } from './collateral/Collateral.entity';
import { LoanEntity } from './loans/Loan.entity';
import { LoanPaybackEntity } from './loans/payback/LoanPayback';

export const entityInitDb = new InitDb([
    BrokerEntity,
    ClientEntity,
    CollateralEntity,
    LoanPaybackEntity,
    LoanEntity,
]);
