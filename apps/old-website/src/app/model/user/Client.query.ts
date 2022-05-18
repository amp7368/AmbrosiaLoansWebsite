import { Query, SortBy } from '@datorama/akita';
import { Observable } from 'rxjs';
import { clientApi } from '../../api/client/ClientApi';
import { QueryEntityBase } from '../QueryEntityBase';
import { Client, ClientState } from './Client.model';
import { clientStore } from './Client.store';

export class ClientQuery extends QueryEntityBase<ClientState> {
    private nextRefresh: Date = new Date();
    selectAllClients(
        sortBy: SortBy<Client, ClientState>
    ): Observable<Client[]> {
        this.tryRefreshClients();
        return this.selectAll({ sortBy });
    }
    private tryRefreshClients() {
        if (this.nextRefresh < new Date()) {
            this.refreshClients();
        }
    }
    refreshClients() {
        clientApi.clientList().then((response) => {
            this.store.setLoading(true);
            this.store.add(response.clients);
            this.store.setLoading(false);
        });
    }
}
export const clientQuery = new ClientQuery(clientStore);
