import { uppercaseFirst } from '../formatStrings/formatStrings';

type SetFn = `set${string}`;
type GetFn = `get${string}`;
type SetDateUnitFn = keyof {
    [Key in keyof Date as Key extends SetFn ? Key : never]: unknown;
};
type GetDateUnitFn = keyof {
    [Key in keyof Date as Key extends GetFn ? Key : never]: unknown;
};
type ExtractUnitFromSet<SetUnit> = SetUnit extends `set${infer Field}`
    ? Field
    : never;

export type DateUnit = Uncapitalize<ExtractUnitFromSet<SetDateUnitFn>>;
export function dateAddUnits(date: Date, unit: DateUnit, amount: number): Date {
    const getFn: GetDateUnitFn = `get${uppercaseFirst(unit)}`;
    const setFn: SetDateUnitFn = `set${uppercaseFirst(unit)}`;
    const newDate: Date = new Date(date);
    const gotten: number = newDate[getFn]();
    newDate[setFn](amount + gotten);
    return newDate;
}
export module DateFactory {
    export function hoursToMillis(hours: number): number {
        return minutesToMillis(hours * 60);
    }
    export function minutesToMillis(minutes: number): number {
        return secondsToMillis(minutes * 60);
    }
    export function secondsToMillis(seconds: number): number {
        return seconds * 1000;
    }
    export function addDays(date: Date, amount: number): Date {
        return dateAddUnits(date, 'date', amount);
    }
    export function addHours(date: Date, amount: number): Date {
        return dateAddUnits(date, 'hours', amount);
    }
    export function addMinutes(date: Date, amount: number): Date {
        return dateAddUnits(date, 'minutes', amount);
    }
    export function addSeconds(date: Date, amount: number): Date {
        return dateAddUnits(date, 'seconds', amount);
    }
    export function addMillis(date: Date, amount: number): Date {
        return dateAddUnits(date, 'milliseconds', amount);
    }

    export function fromNowDays(amount: number): Date {
        return addDays(new Date(), amount);
    }
    export function fromNowHours(amount: number): Date {
        return addHours(new Date(), amount);
    }
    export function fromNowMinutes(amount: number): Date {
        return addMinutes(new Date(), amount);
    }
    export function fromNowSeconds(amount: number): Date {
        return addSeconds(new Date(), amount);
    }
    export function fromNowMillis(amount: number): Date {
        return addMillis(new Date(), amount);
    }
}
