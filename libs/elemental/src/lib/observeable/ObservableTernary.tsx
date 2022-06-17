import { ReactNode } from 'react';
import { Observable } from 'rxjs';
import { ObserveableToElement } from './ObservableToElement';

export interface ObservableTernaryProps {
    observable: Observable<boolean>;
    onTrue: () => JSX.Element | null;
    onFalse: () => JSX.Element | null;
}
export function ObservableTernary(props: ObservableTernaryProps) {
    const mapFn = (flag: boolean) => (flag ? props.onTrue() : props.onFalse());
    return (
        <ObserveableToElement observable={props.observable} mappingFn={mapFn} />
    );
}
