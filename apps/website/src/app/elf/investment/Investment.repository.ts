import {
    ClientSimple,
    InvestmentCreateRequest,
    InvestmentListResponseOk,
    InvestmentSimple,
} from '@api/io-model';
import { useObservableMemo } from '@appleptr16/elemental';
import { Optional } from '@appleptr16/utilities';
import { createStore } from '@ngneat/elf';
import {
    selectAllEntities,
    selectMany,
    setEntities,
    withEntities,
} from '@ngneat/elf-entities';
import { withRequestsCache } from '@ngneat/elf-requests';

import { API } from '../../api/API';
import { VerifyCache } from '../common/VerifyCache';
import { persist } from '../Elf';
import { CollateralBuild } from '../ui/CollateralUI';

export type InvestmentBuildRequest = Omit<
    InvestmentCreateRequest['investment'],
    'collateral'
> & {
    collateral: CollateralBuild[];
};

export const investmentStore = createStore(
    { name: 'investment' },
    withEntities<InvestmentSimple, 'uuid'>({ idKey: 'uuid' }),
    withRequestsCache<'global'>()
);
persist(investmentStore);
const verifyCache: () => void = VerifyCache({
    store: investmentStore,
    fetch: API.investmentList,
    onSuccess: (response: InvestmentListResponseOk) =>
        setEntities(response.investments),
});

export function useListInvestments(): InvestmentSimple[] {
    verifyCache();
    return useObservableMemo(
        () => investmentStore.pipe(selectAllEntities()),
        [investmentStore],
        []
    );
}
export function useClientInvestments(
    client: Optional<ClientSimple>
): InvestmentSimple[] {
    verifyCache();
    return useObservableMemo(
        () => investmentStore.pipe(selectMany(client?.investments ?? [])),
        [investmentStore, client],
        []
    );
}
