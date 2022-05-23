import { readFile, readFileSync } from 'fs';
import { createConnection } from 'typeorm';
import ormconfig from '../../ormconfig.json';
import { entityInitDb } from './entity/entity.initDb';

export async function initTypeOrmDbConnection() {
    const connectionDetails = {
        ...ormconfig,
        entities: entityInitDb.getEntities(),
    } as any;
    if (!ormconfig.username) connectionDetails.username = readF('username.txt');
    connectionDetails.password = readF('password.txt');
    await createConnection(connectionDetails);
}
function readF(file: string) {
    return readFileSync(file, { encoding: 'utf-8' }).replace('\n', '');
}
