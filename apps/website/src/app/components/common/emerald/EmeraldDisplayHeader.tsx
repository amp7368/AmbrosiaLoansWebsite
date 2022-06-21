import { Stack } from '@mui/material';
import { EmeraldUnit } from "./EmeraldUnit";

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
