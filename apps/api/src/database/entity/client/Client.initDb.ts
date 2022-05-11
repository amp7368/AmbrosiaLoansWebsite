import { InitDb } from '../../InitDb';
import { discordInitDb } from './discord/discord.initDb';
import { ClientProfile } from './Client.entity';
import { Credentials } from './UserCredentials';
import { wynnInitDb } from './wynn/wynn.initDb';

export const userInitDb = new InitDb([
    ClientProfile,
    Credentials,
    ...discordInitDb.getEntities(),
    ...wynnInitDb.getEntities(),
]);
