import { ClientSimple } from '@api/io-model';
import { useObservableMemo } from '@appleptr16/elemental';
import { Autocomplete, Box, Container, Input } from '@mui/material';
import { ReactNode } from 'react';
import { useClients } from '../../../elf/client/Client.repository';
import { setUI } from '../../../elf/ui/UI.repository';

export function ClientSelector(props: {
    renderInput: (params: any) => ReactNode;
    uiId: string;
}) {
    const options: ClientSimple[] = useClients();
    return (
        <Autocomplete
            options={options}
            getOptionLabel={(option: ClientSimple) => option.displayName}
            renderInput={props.renderInput}
            renderOption={(props, option) => (
                <Container key={option.uuid}>
                    <li {...props}>{option.displayName}</li>
                </Container>
            )}
            onChange={(e, val) => setUI(props.uiId, 'client', val?.uuid)}
        />
    );
}
