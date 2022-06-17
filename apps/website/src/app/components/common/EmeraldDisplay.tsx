import {
    alpha,
    Color,
    colors,
    Stack,
    Typography,
    useTheme,
} from '@mui/material';
import { green } from '@mui/material/colors';
import { ReactNode } from 'react';
import { ECurrency } from '../../util/Emerald';
type EmeraldUnits = 'stx' | 'le' | 'eb' | 'em';
interface EmeraldUnitProps {
    amount: ReactNode;
    units: EmeraldUnits;
}
const units: Record<EmeraldUnits, keyof Color> = {
    stx: 700,
    le: 400,
    eb: 300,
    em: 100,
};
function EmeraldUnit(props: EmeraldUnitProps) {
    return (
        <Stack direction="row" spacing={0}>
            <Typography color={colors.green[units[props.units]]}>
                {props.amount}
            </Typography>
        </Stack>
    );
}
export function EmeraldDisplay({ emeralds }: { emeralds: number }) {
    const units = new ECurrency(emeralds);
    return (
        <Stack direction="row" spacing={1}>
            <EmeraldUnit amount={units.stx} units="stx" />
            <EmeraldUnit amount={units.le} units="le" />
            <EmeraldUnit amount={units.eb} units="eb" />
            <EmeraldUnit amount={units.em} units="em" />
        </Stack>
    );
}
export function EmeraldDisplayHeader() {
    return (
        <Stack direction="row" spacing={1}>
            <EmeraldUnit amount={'stx'} units="stx" />
            <EmeraldUnit amount={'le'} units="le" />
            <EmeraldUnit amount={'eb'} units="eb" />
            <EmeraldUnit amount={'em'} units="em" />
        </Stack>
    );
}
