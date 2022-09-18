import { readFileSync } from 'fs';
import { join } from 'path';
import { ConnectionOptions, createConnection, getConnection } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

import ormconfig from '../../ormconfig.json';
import { BrokerEntity } from './broker/Broker.entity';
import { ClientEntity } from './client/Client.entity';
import { CollateralEntity } from './collateral/Collateral.entity';
import { InvestEventEntity } from './investment/InvestEvent.entity';
import { InvestmentEntity } from './investment/Investment.entity';
import { LoanEntity } from './loan/Loan.entity';
import { LoanEventEntity } from './loan/LoanEvent.entity';

const entities = [
    BrokerEntity,
    ClientEntity,
    CollateralEntity,
    LoanEventEntity,
    LoanEntity,
    InvestEventEntity,
    InvestmentEntity,
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
