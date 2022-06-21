import { Color } from '@mui/material';
import { green } from '@mui/material/colors';
import { ReactNode } from 'react';
import { AppTypography } from '../AppTypography';

export type EmeraldUnitType = 'stx' | 'le' | 'eb' | 'em';
interface EmeraldUnitProps {
    amount: ReactNode;
    units: EmeraldUnitType;
}
const units: Record<EmeraldUnitType, keyof Color> = {
    stx: 700,
    le: 400,
    eb: 300,
    em: 100,
};
export function EmeraldUnit(props: EmeraldUnitProps) {
    return (
        <AppTypography color={green[units[props.units]]}>
            {props.amount}
        </AppTypography>
    );
}
