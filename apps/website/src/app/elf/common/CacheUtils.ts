import { DateFactory } from '@appleptr16/utilities';

export type CacheUpdate = {
    ttl: number;
    value: 'none' | 'partial' | 'full' | undefined;
};
export const CacheTimings = {
    onSuccess: {
        ttl: DateFactory.minutesToMillis(1),
        value: 'full',
    } as CacheUpdate,
    onError: {
        value: 'partial',
        ttl: DateFactory.secondsToMillis(5),
    } as CacheUpdate,
};
