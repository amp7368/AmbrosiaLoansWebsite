import { useMemo } from 'react';
import { Observable } from 'rxjs';
import { useObservable } from './useObservable';

export function useObservableMemo<T>(
    factory: () => Observable<T>,
    deps: unknown[],
    initialState: T
) {
    const observable: Observable<T> = useMemo(factory, deps);
    return useObservable(observable, initialState);
}
