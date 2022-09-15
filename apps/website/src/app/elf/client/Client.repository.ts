import {
    ClientCreateRequest,
    ClientCreateResponse,
    ClientListResponseOk,
    ClientSimple,
} from '@api/io-model';
import { useObservableMemo } from '@appleptr16/elemental';
import { Optional } from '@appleptr16/utilities';
import { createStore } from '@ngneat/elf';
import {
    getAllEntities,
    getEntity,
    selectAllEntities,
    selectEntities,
    selectEntity,
    setEntities,
    updateEntities,
    withEntities,
} from '@ngneat/elf-entities';
import { withRequestsCache } from '@ngneat/elf-requests';

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
    return useObservableMemo(
        () => clientStore.pipe(selectAllEntities()),
        [clientStore],
        []
    );
}
export function useClient(client: Optional<string>): Optional<ClientSimple> {
    verifyCache();
    return useObservableMemo(
        () => clientStore.pipe(selectEntity(client ?? '')),
        [clientStore],
        clientStore.query(getEntity(client ?? ''))
    );
}
export async function createClient(
    request: ClientCreateRequest
): Promise<ClientCreateResponse> {
    const response: ClientCreateResponse = await API.clientCreate(request);
    if (response.isOk) clientStore.update(setEntities([response.client]));
    return response;
}
export function updateClient(
    id: string,
    update: (client: ClientSimple) => ClientSimple
) {
    clientStore.update(updateEntities(id, update));
}
