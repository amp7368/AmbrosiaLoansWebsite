import { DiscordAccountBase } from './DiscordAccountBase';
import { CredentialsBase } from './CredentialsBase';
import { WynnAccountBase } from './WynnAccountBase';

export interface ServerProfileBase extends ClientProfileBase {
    credentials: CredentialsBase;
}

export interface ClientProfileBase extends ProfileBase {
    discordAccount: DiscordAccountBase;
}

export interface ProfileBase {
    userId: string;
}
