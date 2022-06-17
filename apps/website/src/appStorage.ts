import { persistState } from '@datorama/akita';

const appStorage = persistState();
export function clearAppStorage() {
    appStorage.clearStore();
    console.log('STORAGE CLEARED');
}
export function initAkita() {}
