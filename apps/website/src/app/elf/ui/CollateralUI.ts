import { CollateralCreateRequest } from '@api/io-model';
import { useObservableMemo } from '@appleptr16/elemental';
import { Optional } from '@appleptr16/utilities';
import { createStore } from '@ngneat/elf';
import {
    addEntities,
    getEntity,
    selectEntity,
    setEntities,
    UIEntitiesRef,
    updateEntities,
    withUIEntities,
} from '@ngneat/elf-entities';
import { persist } from '../Elf';

export type CollateralBuild = {
    image?: FileList;
    comments?: string;
};
type UICollateralEnv = {
    id: string;
    collateral: CollateralBuild[];
};
export const collateralUiStore = createStore(
    { name: 'uiCollateral' },
    withUIEntities<UICollateralEnv, 'id'>({ idKey: 'id', initialValue: [] })
);
persist(collateralUiStore);
export function useCollateralUI(id: string): UICollateralEnv {
    let ui = useObservableMemo(
        () => collateralUiStore.pipe(selectEntity(id, { ref: UIEntitiesRef })),
        [id, collateralUiStore],
        null
    );
    if (ui) return ui;
    if (ui === null) return { collateral: [], id };
    ui = { id, collateral: [] };
    try {
        collateralUiStore.update(addEntities(ui, { ref: UIEntitiesRef }));
    } catch (e) {
        console.error(e);
    }
    return ui;
}
export function getCollateralUI(id: string): UICollateralEnv {
    let ui = collateralUiStore.query(getEntity(id, { ref: UIEntitiesRef }));
    return ui ?? { collateral: [], id };
}
export function setCollateralUI(id: string): void {
    collateralUiStore.update(
        setEntities([{ id, collateral: [] }], { ref: UIEntitiesRef })
    );
}
export function addCollateralUI(id: string) {
    collateralUiStore.update(
        updateEntities(
            id,
            (old) => ({
                id,
                collateral: [...old.collateral, { comments: '' }],
            }),
            { ref: UIEntitiesRef }
        )
    );
}
export function removeCollateralUI(id: string, index: number) {
    collateralUiStore.update(
        updateEntities(
            id,
            (state) => {
                const collateral = [...state.collateral];
                collateral.splice(index, 1);
                return { id, collateral };
            },
            { ref: UIEntitiesRef }
        )
    );
}
