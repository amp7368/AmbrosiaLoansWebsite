import { LoginRequest, LoginResponse, SessionBase } from '@api/io-model';
import { useObservable, useObservableMemo } from '@appleptr16/elemental';
import { Optional } from '@appleptr16/utilities';
import { createState, createStore, setProp, withProps } from '@ngneat/elf';
import { localStorageStrategy, persistState } from '@ngneat/elf-persist-state';
import { useCallback, useEffect, useState } from 'react';
import { map } from 'rxjs';
import { API } from '../../api/API';
import { persist } from '../Elf';

export type SelfUserBroker = { displayName: string };
export type SelfUserState = {
    session: Optional<SessionBase>;
    broker: Optional<SelfUserBroker>;
};
export const selfUserStore = createStore(
    { name: 'selfUser' },
    withProps<SelfUserState>({
        session: undefined,
        broker: { displayName: 'Tealycraft' },
    })
);
persist(selfUserStore);
export async function selfUserLogin(
    login: LoginRequest
): Promise<LoginResponse> {
    const response: LoginResponse = await API.login(login);
    if (response.isOk) {
        const session: SessionBase = response.session;
        session.expiration = new Date(session.expiration);
        selfUserStore.update(setProp('session', session));
    }
    return response;
}
export function getSessionToken() {
    return selfUserStore.getValue().session?.sessionToken;
}
export function useIsLoggedIn(): Optional<boolean> {
    const session: null | Optional<SessionBase> = useObservableMemo(
        () => selfUserStore.pipe(map((state) => state.session)),
        [selfUserStore],
        null
    );
    const [s, refresh] = useState(null);
    useEffect(() => {
        if (!session) return;
        const expiration =
            new Date(session.expiration).getTime() - new Date().getTime();
        const timeout = setTimeout(() => refresh(null), expiration);
        return () => clearTimeout(timeout);
    });
    if (session === undefined) return false;
    if (session === null) return undefined;
    return new Date(session.expiration) > new Date();
}
export function useBroker(): Optional<SelfUserBroker> {
    return useObservableMemo(
        () => selfUserStore.pipe(map((state) => state.broker)),
        [selfUserStore],
        undefined
    );
}
