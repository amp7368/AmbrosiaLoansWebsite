import { StoreConfig } from '@datorama/akita';

import { StoreEntityBase } from '../StoreEntityBase';
import { ClientState } from './Client.model';

@StoreConfig({ idKey: 'uuid', name: 'client' })
export class ClientStore extends StoreEntityBase<ClientState> {}
export const clientStore = new ClientStore([]);
