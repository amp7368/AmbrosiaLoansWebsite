import { Client, ClientSimple } from '@api/io-model';
import { useObservableList } from '@appleptr16/elemental';
import { Button, Stack, Typography } from '@mui/material';
import { map } from 'rxjs';

import { clientQuery } from '../../akita/client/Client.query';
import { routes } from '../../util/routes';

function ClientRow(client: ClientSimple) {
    return (
        <Stack direction="row" key={client.uuid}>
            <Typography>{client.displayName}</Typography>
            <Typography>{client.discordTag}</Typography>
        </Stack>
    );
}
export function ClientsPage() {
    const clients = clientQuery.clients
        .select()
        .pipe(map((state) => state.newState ?? []));

    const clientProfile = useObservableList(clients, (a, b) =>
        a.displayName.localeCompare(b.displayName)
    );
    return (
        <>
            <Button
                variant="outlined"
                color="secondary"
                href={routes.createClient}
            >
                +
            </Button>
            <Stack direction="column">{clientProfile.map(ClientRow)}</Stack>
        </>
    );
}
