import { InitDb } from '../../InitDb';
import { ClientProfile } from './Client.entity';

export const userInitDb = new InitDb([ClientProfile]);
