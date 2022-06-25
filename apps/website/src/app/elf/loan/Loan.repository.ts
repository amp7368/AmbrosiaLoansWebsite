import {
    AmbrosiaResponse,
    ClientSimple,
    Loan,
    LoanCreateRequest,
    LoanCreateResponse,
    LoanListResponse,
    LoanListResponseOk,
    LoanSimple,
} from '@api/io-model';
import { useObservableMemo } from '@appleptr16/elemental';
import { DateFactory, Optional } from '@appleptr16/utilities';
import { createStore } from '@ngneat/elf';
import {
    getAllEntities,
    selectAllEntities,
    selectEntities,
    selectEntity,
    selectMany,
    setEntities,
    withEntities,
} from '@ngneat/elf-entities';
import {
    CacheState,
    getRequestCache,
    updateRequestCache,
    withRequestsCache,
} from '@ngneat/elf-requests';
import { API } from '../../api/API';
import { CacheTimings } from '../common/CacheUtils';
import { VerifyCache } from '../common/VerifyCache';
import { persist } from '../Elf';

export const loanStore = createStore(
    { name: 'loan' },
    withEntities<LoanSimple, 'uuid'>(),
    withRequestsCache<'global'>()
);
persist(loanStore);
const verifyCache = VerifyCache({
    store: loanStore,
    fetch: API.loanList,
    onSuccess: (response: LoanListResponseOk) => setEntities(response.loans),
});

export function useLoans(): LoanSimple[] {
    verifyCache();
    return loanStore.query(getAllEntities());
}
export function useClientLoans(client: Optional<ClientSimple>): LoanSimple[] {
    verifyCache();
    return useObservableMemo(
        () => loanStore.pipe(selectMany(client ? client.loans : [])),
        [loanStore],
        []
    );
}
export async function createLoan(
    request: LoanCreateRequest
): Promise<LoanCreateResponse> {
    const response: LoanCreateResponse = await API.loanCreate(request);
    if (response.isOk) loanStore.update(setEntities([response.loan]));
    return response;
}
