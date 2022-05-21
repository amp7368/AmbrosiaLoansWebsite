import { readFile, readFileSync } from 'fs';
import { createConnection } from 'typeorm';
import ormconfig from '../../ormconfig.json';
import { entityInitDb } from './entity/entity.initDb';

export async function initTypeOrmDbConnection() {
    console.log(readF('username.txt'));
    console.log(readF('password.txt'));
    await createConnection({
        ...ormconfig,
        username: readF('username.txt'),
        password: readF('password.txt'),
        entities: entityInitDb.getEntities(),
    } as any);
}
function readF(file: string) {
    return readFileSync(file, { encoding: 'utf-8' }).replace('\n', '');
}
