import { ReactNode } from 'react';
import { Observable } from 'rxjs';
import { ObserveableToElement } from './ObservableToElement';
import { useObservable } from './useObservable';

export interface ObservableTernaryProps {
    observable: Observable<boolean>;
    onTrue: () => JSX.Element | null;
    onFalse: () => JSX.Element | null;
}
export function ObservableTernary(props: ObservableTernaryProps) {
    const mapFn = (flag: boolean) => (flag ? props.onTrue() : props.onFalse());
    const val = useObservable(props.observable, false);
    if (val) return props.onTrue();
    else return props.onFalse();
}
