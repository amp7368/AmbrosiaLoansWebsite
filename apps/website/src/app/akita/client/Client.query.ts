import {
    AmbrosiaException,
    AmbrosiaResponseOK,
    ClientCreateRequest,
    ClientListResponse,
    ClientSimple,
    LoanSimple,
    okResponse,
} from '@api/io-model';
import { useObservableMemo } from '@appleptr16/elemental';
import { Optional } from '@appleptr16/utilities';
import { map } from 'rxjs';

import { API } from '../../api/API';
import { AppEntityQuery } from '../base/AppEntityQuery';
import { UpdatableState, UpdatedState } from '../base/UpdateState';
import { loanQuery } from '../loan/Loan.query';
import { ClientState, clientStore } from './Client.store';

export class ClientQuery extends AppEntityQuery<ClientState> {
    clients = new UpdatableState<ClientSimple[]>(() => this.supplyClients());
    private async supplyClients(): Promise<UpdatedState<ClientSimple[]>> {
        const response: ClientListResponse = await API.clientList();
        if (response.isOk) {
            this.store.add(response.clients);
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
        this.clients.set((state: UpdatedState<ClientSimple[]>) => ({
            newState: [...(state.newState ?? []), response.client],
            isError: state.isError,
        }));
        return okResponse;
    }
}
export const clientQuery = new ClientQuery(clientStore);
export function useClient(client: Optional<string>): Optional<ClientSimple> {
    return useObservableMemo(
        () => clientQuery.selectEntity((c) => c.displayName === client),
        [client, clientQuery],
        undefined
    );
}
export function useClientLoans(
    client: Optional<ClientSimple>
): Optional<LoanSimple[]> {
    return useObservableMemo(
        () => loanQuery.selectMany(client?.loans ?? []),
        [client, clientQuery],
        undefined
    );
}
// export function useClientInvestments(client: Optional<ClientSimple>) {
//     return useObservableMemo(
//         () => investmentQuery.selectMany(client?.loans ?? []),
//         [client, clientQuery],
//         undefined
//     );
// }
