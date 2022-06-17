import { ReactNode } from 'react';
import { Observable } from 'rxjs';
import { ObserveableToElement } from './ObservableToElement';

export interface ObservableSwitchProps<T extends keyof any> {
    observable: Observable<T>;
    cases: Record<T, () => JSX.Element | null>;
}
export function ObservableSwitch<T extends keyof any>(
    props: ObservableSwitchProps<T>
) {
    const mapFn = (obv: T): JSX.Element | null => props.cases[obv]();
    return (
        <ObserveableToElement<T>
            observable={props.observable}
            mappingFn={mapFn}
        />
    );
}
