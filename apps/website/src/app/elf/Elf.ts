import { getRegistry, Store } from '@ngneat/elf';
import { localStorageStrategy, persistState } from '@ngneat/elf-persist-state';

export function persist(store: Store) {
    persistState(store, { storage: localStorageStrategy });
}
export function resetStores() {
    getRegistry().forEach((store) => store.reset());
    console.log('RESET STORES');
}
