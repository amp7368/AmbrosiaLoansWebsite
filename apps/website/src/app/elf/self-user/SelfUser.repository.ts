import { LoginRequest, LoginResponse, SessionBase } from '@api/io-model';
import { useObservable } from '@appleptr16/elemental';
import { Optional } from '@appleptr16/utilities';
import { createStore, setProp, withProps } from '@ngneat/elf';
import { localStorageStrategy, persistState } from '@ngneat/elf-persist-state';
import { API } from '../../api/API';
import { persist } from '../Elf';

export type SelfUserState = {
    session: Optional<SessionBase>;
    broker?: { displayName: string };
};
export const selfUserStore = createStore(
    { name: 'loan' },
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
export function useIsLoggedIn() {
    const state = selfUserStore.getValue();
    if (!state.session) return false;
    return new Date() < new Date(state.session.expiration);
}
