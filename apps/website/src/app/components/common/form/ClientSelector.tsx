import { useObservableMemo } from '@appleptr16/elemental';
import { Autocomplete, Box, Container, Input } from '@mui/material';
import { ReactNode } from 'react';
import { clientQuery } from '../../../akita/client/Client.query';

export function ClientSelector(props: {
    renderInput: (params: any) => ReactNode;
    setClient: (client: string) => void;
}) {
    const options = useObservableMemo(
        () => clientQuery.clients.select(),
        [clientQuery.clients],
        clientQuery.clients.getValue()
    );
    return (
        <Autocomplete
            options={options.newState ?? []}
            getOptionLabel={(option) => option.displayName}
            renderInput={props.renderInput}
            renderOption={(props, option) => (
                <Container key={option.uuid}>
                    <li {...props}>{option.displayName}</li>
                </Container>
            )}
            onChange={(event, val) => props.setClient(val?.displayName ?? '')}
        />
    );
}
