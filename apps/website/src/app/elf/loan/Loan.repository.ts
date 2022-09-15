import {
    ClientSimple,
    CollateralResponse,
    LoanCreateRequest,
    LoanCreateResponse,
    LoanListResponseOk,
    LoanSimple,
} from '@api/io-model';
import { useObservableMemo } from '@appleptr16/elemental';
import { Optional } from '@appleptr16/utilities';
import { createStore } from '@ngneat/elf';
import {
    getAllEntities,
    selectAllEntities,
    selectMany,
    setEntities,
    withEntities,
} from '@ngneat/elf-entities';
import { withRequestsCache } from '@ngneat/elf-requests';

import { API } from '../../api/API';
import { updateClient } from '../client/Client.repository';
import { VerifyCache } from '../common/VerifyCache';
import { persist } from '../Elf';
import { CollateralBuild } from '../ui/CollateralUI';

export type LoanBuildRequest = Omit<LoanCreateRequest['loan'], 'collateral'> & {
    collateral: CollateralBuild[];
};

export const loanStore = createStore(
    { name: 'loan' },
    withEntities<LoanSimple, 'uuid'>({ idKey: 'uuid' }),
    withRequestsCache<'global'>()
);
persist(loanStore);
const verifyCache: () => void = VerifyCache({
    store: loanStore,
    fetch: API.loanList,
    onSuccess: (response: LoanListResponseOk) => setEntities(response.loans),
});

export function useListLoans(): LoanSimple[] {
    verifyCache();
    return useObservableMemo(
        () => loanStore.pipe(selectAllEntities()),
        [loanStore],
        []
    );
}
export function useClientLoans(client: Optional<ClientSimple>): LoanSimple[] {
    verifyCache();
    return useObservableMemo(
        () => loanStore.pipe(selectMany(client?.loans ?? [])),
        [loanStore, client],
        []
    );
}
export async function createLoan(
    request: LoanBuildRequest
): Promise<LoanCreateResponse> {
    const collateralResponse: CollateralResponse[] = await Promise.all(
        request.collateral.map((c) => API.collateralCreate(c))
    );
    const isNotOk = collateralResponse.find((res) => !res.isOk);
    if (isNotOk && !isNotOk?.isOk) return { ...isNotOk };
    const collateral: string[] = collateralResponse.map((res) =>
        res.isOk ? res.collateral.uuid : ''
    );
    const response: LoanCreateResponse = await API.loanCreate({
        loan: { ...request, collateral },
    });
    if (response.isOk) {
        loanStore.update(setEntities([response.loan]));
        updateClient(response.loan.client, (client) => ({
            ...client,
            loan: [...client.loans, response.loan.uuid],
        }));
    }
    return response;
}
