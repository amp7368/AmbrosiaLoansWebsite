import { ClientSimple } from '@api/io-model';
import { useObservableMemo } from '@appleptr16/elemental';
import { Optional } from '@appleptr16/utilities';
import { createStore } from '@ngneat/elf';
import {
    selectEntity,
    UIEntitiesRef,
    updateEntities,
    withUIEntities,
} from '@ngneat/elf-entities';
import { useClient } from '../client/Client.repository';

type UIEnv = {
    id: string;
    client: Optional<string>;
};
type EnvKey = Exclude<keyof UIEnv, 'id'>;
export const uiStore = createStore(
    { name: 'ui' },
    withUIEntities<UIEnv>({
        initialValue: [{ id: 'global', client: undefined }],
    })
);
export function setUI<Key extends EnvKey>(
    id: string,
    key: Key,
    prop: UIEnv[Key]
) {
    uiStore.update(updateEntities(id, { [key]: prop }, { ref: UIEntitiesRef }));
}
export function useUI<Key extends EnvKey>(id: string, key: Key): UIEnv[Key] {
    return useObservableMemo(
        () =>
            uiStore.pipe(selectEntity(id, { pluck: key, ref: UIEntitiesRef })),
        [id, key, uiStore],
        undefined
    );
}
export function useUIClient(id: string): Optional<ClientSimple> {
    const uuid = useUI(id, 'client');
    return useClient(uuid);
}
