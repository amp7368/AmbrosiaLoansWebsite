import { InitDb } from '../InitDb';
import { clientInitDb } from './client/Client.initDb';

export const entityInitDb = new InitDb([...clientInitDb.getEntities()]);
