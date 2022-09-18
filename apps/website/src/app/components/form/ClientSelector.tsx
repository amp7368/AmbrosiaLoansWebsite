import { ClientSimple } from '@api/io-model';
import { useObservableMemo } from '@appleptr16/elemental';
import { Optional } from '@appleptr16/utilities';
import {
    Autocomplete,
    AutocompleteProps,
    AutocompleteRenderInputParams,
    Box,
    Container,
    Input,
} from '@mui/material';
import { ReactNode } from 'react';
import { useClients } from '../../elf/client/Client.repository';
import { setUI } from '../../elf/ui/UI.repository';

export function ClientSelector(props: {
    renderInput: (params: AutocompleteRenderInputParams) => ReactNode;
    uiId: string;
}) {
    const options: Optional<ClientSimple[]> = useClients();
    if (!options) return null;
    return (
        <Autocomplete
            options={options}
            isOptionEqualToValue={(o1, o2) => o1.uuid === o2.uuid}
            getOptionLabel={(option: ClientSimple) => option.displayName}
            renderInput={props.renderInput}
            renderOption={(props, option) => (
                <li {...props} key={option.uuid} value={option.uuid}>
                    {option.displayName}
                </li>
            )}
            onChange={(e, val) => setUI(props.uiId, 'client', val?.uuid)}
        />
    );
}
