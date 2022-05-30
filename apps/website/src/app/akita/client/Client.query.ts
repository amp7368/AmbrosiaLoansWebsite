import { DateFactory } from '@appleptr16/utilities';
import { AppEntityQuery } from '../base/AppEntityQuery';
import { UpdatableState, UpdatedState } from '../base/UpdateState';
import { ClientState, clientStore } from './Client.store';

export class ClientQuery extends AppEntityQuery<ClientState> {
    lastUpdated = new UpdatableState<ClientState[]>(this.supplyClients);
    private async supplyClients(): Promise<UpdatedState<ClientState[]>> {
        return { newState: [], isError: false };
    }
}
export const clientQuery = new ClientQuery(clientStore);
