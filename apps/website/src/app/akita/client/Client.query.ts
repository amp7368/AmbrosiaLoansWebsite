import {
    AmbrosiaException,
    AmbrosiaResponse,
    AmbrosiaResponseOK,
    ClientCreateRequest,
    ClientCreateResponse,
    ClientProfile,
    okResponse,
} from '@api/io-model';
import { API } from '../../api/API';
import { AppEntityQuery } from '../base/AppEntityQuery';
import { UpdatableState, UpdatedState } from '../base/UpdateState';
import { ClientState, clientStore } from './Client.store';

export class ClientQuery extends AppEntityQuery<ClientState> {
    clients = new UpdatableState<ClientProfile[]>(() => this.supplyClients());
    private async supplyClients(): Promise<UpdatedState<ClientProfile[]>> {
        const response = await API.clientList();
        if (response.isOk) {
            return { newState: response.clients, isError: false };
        }
        return {
            newState: this.clients.getValue().newState,
            isError: true,
        };
    }
    async createClient(
        request: ClientCreateRequest
    ): Promise<AmbrosiaResponseOK | AmbrosiaException> {
        const response = await API.clientCreate(request);
        if (!response.isOk) return response;
        this.clients.set((state: UpdatedState<ClientProfile[]>) => ({
            newState: [...(state.newState ?? []), response.client],
            isError: state.isError,
        }));
        return okResponse;
    }
}
export const clientQuery = new ClientQuery(clientStore);
