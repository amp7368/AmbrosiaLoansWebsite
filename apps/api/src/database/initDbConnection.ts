import { readFileSync } from 'fs';
import { join } from 'path';
import { ConnectionOptions, createConnection } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

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
type Writeable<T> = { -readonly [P in keyof T]: T[P] };

export async function initTypeOrmDbConnection() {
    const connectionDetails = {
        ...ormconfig,
        entities,
    } as Writeable<PostgresConnectionOptions>;
    connectionDetails.username = readF('username.txt');
    connectionDetails.password = readF('password.txt');
    await createConnection(connectionDetails);
}

function readF(file: string) {
    file = join('secrets', 'database', file);
    return readFileSync(file, { encoding: 'utf-8' }).replace('\n', '');
}
