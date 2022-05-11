import { InitDb } from '../InitDb';
import { userInitDb } from './client/Client.initDb';

export const entityInitDb = new InitDb([...userInitDb.getEntities()]);
