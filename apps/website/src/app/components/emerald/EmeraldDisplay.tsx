import { Stack } from '@mui/material';
import { display } from '@mui/system';
import { ReactNode } from 'react';

import { ECurrency } from '../../util/Emerald';
import { EmeraldUnit, EmeraldUnitType } from './EmeraldUnit';

export interface EmeraldDisplayProps {
    emeralds: number;
    length: 'short' | 'normal';
}
const displayFn: Record<
    'short' | 'normal',
    Record<EmeraldUnitType, (s: number) => string>
> = {
    short: {
        stx: (s) => `${s}`,
        le: (s) => `${s}`,
        eb: (s) => `${s}`,
        em: (s) => `${s}`,
    },
    normal: {
        stx: (s) => `${s}stx`,
        le: (s) => `${s}le`,
        eb: (s) => `${s}eb`,
        em: (s) => `${s}em`,
    },
};
export function EmeraldDisplay({ emeralds, length }: EmeraldDisplayProps) {
    const units = new ECurrency(emeralds);
    const display = displayFn[length];
    return (
        <Stack direction="row" spacing={1}>
            <EmeraldUnit amount={display.stx(units.stx)} units="stx" />
            <EmeraldUnit amount={display.le(units.le)} units="le" />
            <EmeraldUnit amount={display.eb(units.eb)} units="eb" />
            <EmeraldUnit amount={display.em(units.em)} units="em" />
        </Stack>
    );
}
