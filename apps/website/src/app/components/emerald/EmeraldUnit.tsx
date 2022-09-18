import { Color, useTheme } from '@mui/material';
import { green } from '@mui/material/colors';
import { ReactNode } from 'react';
import { AppTypography } from '.Typography';

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
    const color: string = green[units[props.units]];
    // const t = useTheme().palette.getContrastText(color);
    return <AppTypography color={color}>{props.amount}</AppTypography>;
}
