import { readFileSync } from 'fs';
import { join } from 'path';
import { createConnection } from 'typeorm';

import ormconfig from '../../ormconfig.json';
import { BrokerEntity } from './entity/broker/Broker.entity';
import { ClientEntity } from './entity/client/Client.entity';
import { CollateralEntity } from './entity/collateral/Collateral.entity';
import { LoanEntity } from './entity/loans/Loan.entity';
import { LoanPaybackEntity } from './entity/loans/payback/LoanPayback';

const entities = [
    BrokerEntity,
    ClientEntity,
    CollateralEntity,
    LoanPaybackEntity,
    LoanEntity,
];
export async function initTypeOrmDbConnection() {
    const connectionDetails = {
        ...ormconfig,
        entities,
    } as any;
    connectionDetails.username = readF('username.txt');
    connectionDetails.password = readF('password.txt');
    await createConnection(connectionDetails);
}
function readF(file: string) {
    file = join('secrets', 'database', file);
    return readFileSync(file, { encoding: 'utf-8' }).replace('\n', '');
}
