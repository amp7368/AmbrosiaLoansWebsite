import { ClientProfileBase } from '@api/io-model';
import { EntityState } from '@datorama/akita';

export interface Client extends ClientProfileBase {}
export type ClientState = EntityState<Client, string>;
