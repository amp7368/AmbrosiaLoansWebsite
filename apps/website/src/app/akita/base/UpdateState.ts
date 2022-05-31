import { DateFactory, Optional } from '@appleptr16/utilities';
import {
    delay,
    filter,
    interval,
    map,
    Observable,
    Subject,
    Subscription,
    tap,
} from 'rxjs';

export type UpdatedState<State> = {
    newState: Optional<State>;
    isError: boolean;
};
export type UpdateSupplyState<State> = () => Promise<UpdatedState<State>>;
export type OnUpdateState<State> = (state: UpdatedState<State>) => void;
export class UpdatableState<State> {
    private nextUpdate: Date = new Date(0);
    private cached: UpdatedState<State> = {
        newState: undefined,
        isError: true,
    };
    private observeable: Subject<UpdatedState<State>> = new Subject<
        UpdatedState<State>
    >();
    private updateFn: () => Promise<UpdatedState<State>>;
    private timeout: number;
    private onErrorMillis: number;
    constructor(
        updateFn: UpdateSupplyState<State>,
        cacheMillis: number = DateFactory.minutesToMillis(5),
        onErrorMillis: number = DateFactory.minutesToMillis(1)
    ) {
        this.updateFn = updateFn;
        this.timeout = cacheMillis;
        this.onErrorMillis = Math.min(onErrorMillis, cacheMillis + 1);
    }
    getValue(): UpdatedState<State> {
        return this.cached;
    }
    select(): Observable<UpdatedState<State>> {
        this.get();
        return this.observeable.asObservable();
    }
    async get(): Promise<UpdatedState<State>> {
        if (this.nextUpdate > new Date()) return this.cached;
        return this.updateNow();
    }
    set(updateFn: (state: UpdatedState<State>) => UpdatedState<State>): void {
        this.cached = updateFn(this.cached);
    }
    async updateNow(): Promise<UpdatedState<State>> {
        this.nextUpdate = DateFactory.fromNowMillis(this.timeout);
        const state: UpdatedState<State> = await this.updateFn();
        if (state.isError) {
            const retry: Observable<number> = interval(this.onErrorMillis);
            const subscription: Subscription = retry.subscribe(this.get);
            subscription.add(subscription.unsubscribe);
        }
        this.observeable.next(state);
        return this.cached;
    }
    onSuccess(onSuccess: OnUpdateState<State>): this {
        this.observeable
            .pipe(filter((ob: UpdatedState<State>) => !ob.isError))
            .subscribe(onSuccess);
        return this;
    }
    onFailure(onFailure: OnUpdateState<State>): this {
        this.observeable
            .pipe(filter((ob: UpdatedState<State>) => !ob.isError))
            .subscribe(onFailure);
        return this;
    }
    onUpdate(onUpdate: OnUpdateState<State>): this {
        this.observeable.subscribe(onUpdate);
        return this;
    }
}
