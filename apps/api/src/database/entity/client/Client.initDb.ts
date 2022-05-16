import { InitDb } from '../../InitDb';
import { ClientProfile } from './Client.entity';

export const clientInitDb = new InitDb([ClientProfile]);
