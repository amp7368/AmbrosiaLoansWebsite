import { ObserveableToElement } from '@appleptr16/elemental';
import { SortBy } from '@datorama/akita';
import { List, Stack } from '@mui/material';
import { useState } from 'react';
import { Client, ClientState } from '../../../../model/user/Client.model';
import { clientQuery } from '../../../../model/user/Client.query';

function ClientListItem(props: Client) {
    return (
        <Stack direction="row">
            {props.displayName}
            {props.discordTag}
        </Stack>
    );
}

export interface ClientPageListProps {
    clients: Client[];
}
interface ClientPageListState {
    sortBy: SortBy<Client, ClientState>;
}
function ClientsToListMapping(clients: Client[]) {
    return (
        <List>
            {clients.map((client) => (
                <ClientListItem {...client} />
            ))}
        </List>
    );
}
export function ClientPageList() {
    const [state, setState] = useState<ClientPageListState>({
        sortBy: 'emeraldsInvested',
    });
    const selectClients = clientQuery.selectAllClients(state.sortBy);
    return (
        <ObserveableToElement
            original={selectClients}
            mappingFn={ClientsToListMapping}
        />
    );
}
