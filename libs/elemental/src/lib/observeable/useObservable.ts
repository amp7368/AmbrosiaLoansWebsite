import { useEffect, useMemo, useState } from 'react';
import { Observable } from 'rxjs';

export function useObservable<T>(observable: Observable<T>, initialState: T) {
    const [state, setState] = useState<T>(initialState);
    const subscription = useMemo(() => {
        return observable.subscribe(setState);
    }, [observable]);
    useEffect(() => {
        return () => {
            subscription.unsubscribe();
        };
    }, [subscription]);

    return state;
}
export function useObservableList<T>(
    observable: Observable<T[]>,
    comparator?: (a: T, b: T) => number
) {
    const [state, setState] = useState<T[]>([]);
    const subscription = useMemo(() => {
        return observable.subscribe((lst) => {
            setState(lst.sort(comparator));
        });
    }, [observable]);
    useEffect(() => {
        return () => {
            subscription.unsubscribe();
        };
    }, [subscription]);
    return state;
}
