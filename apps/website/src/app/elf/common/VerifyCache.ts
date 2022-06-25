import { AmbrosiaResponse, AmbrosiaResponseOK } from '@api/io-model';
import { Reducer, Store } from '@ngneat/elf';
import { setEntities } from '@ngneat/elf-entities';
import {
    CacheState,
    getRequestCache,
    updateRequestCache,
} from '@ngneat/elf-requests';
import { CacheTimings } from './CacheUtils';
export interface VerifyCacheProps<T, S> {
    store: Store;
    fetch: () => Promise<AmbrosiaResponse<T>>;
    onSuccess: (response: AmbrosiaResponseOK<T>) => Reducer<S>;
}
export function VerifyCache<T, S>(props: VerifyCacheProps<T, S>) {
    return () => {
        const cache: CacheState = props.store.query(getRequestCache('global'));
        if (cache.value !== 'none') return;
        props.fetch().then((response: AmbrosiaResponse<T>) => {
            if (response.isOk) {
                props.store.update(
                    props.onSuccess(response),
                    updateRequestCache('global', CacheTimings.onSuccess)
                );
            } else {
                console.error(response);
                props.store.update(
                    updateRequestCache('global', CacheTimings.onError)
                );
            }
        });
    };
}
