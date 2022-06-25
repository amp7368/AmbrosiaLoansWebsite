import {
    AmbrosiaResponse,
    Client,
    ClientCreateRequest,
    ClientCreateResponse,
    ClientListResponseOk,
    ClientSimple,
} from '@api/io-model';
import { useObservableMemo } from '@appleptr16/elemental';
import { DateFactory, Optional } from '@appleptr16/utilities';
import { createStore } from '@ngneat/elf';
import {
    getAllEntities,
    selectEntity,
    selectFirst,
    setEntities,
    withEntities,
} from '@ngneat/elf-entities';
import {
    CacheState,
    getRequestCache,
    updateRequestCache,
    withRequestsCache,
} from '@ngneat/elf-requests';
import { filter } from 'rxjs';
import { API } from '../../api/API';
import { VerifyCache } from '../common/VerifyCache';
import { persist } from '../Elf';

export const clientStore = createStore(
    { name: 'client' },
    withEntities<ClientSimple, 'uuid'>({ idKey: 'uuid' }),
    withRequestsCache<'global'>()
);
persist(clientStore);

const verifyCache = VerifyCache({
    store: clientStore,
    fetch: API.clientList,
    onSuccess: (response: ClientListResponseOk) =>
        setEntities([...(response.clients ?? [])]),
});
export function useClients(): ClientSimple[] {
    verifyCache();
    return clientStore.query(getAllEntities());
}
export function useClient(client: Optional<string>): Optional<ClientSimple> {
    verifyCache();
    return useObservableMemo(
        () => clientStore.pipe(selectEntity(client ?? '')),
        [clientStore],
        undefined
    );
}
export async function createClient(
    request: ClientCreateRequest
): Promise<ClientCreateResponse> {
    const response: ClientCreateResponse = await API.clientCreate(request);
    if (response.isOk) clientStore.update(setEntities([response.client]));
    return response;
}
