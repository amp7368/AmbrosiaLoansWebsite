import { ClientSimple } from '@api/io-model';
import { useObservableList } from '@appleptr16/elemental';
import { alpha, Button, colors, Container, Stack } from '@mui/material';
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';
import { map } from 'rxjs';

import { clientQuery } from '../../akita/client/Client.query';
import { routes } from '../../util/routes';
import { Page } from '../common/Page';

const columns: GridColDef[] = [
    { field: 'displayName', headerName: 'Name', width: 200 },
    { field: 'mcName', headerName: 'Minecraft', width: 200 },
    { field: 'discordTag', headerName: 'Discord', width: 200 },
];

export function ClientsPage() {
    const clientsRaw = clientQuery.clients
        .select()
        .pipe(map((state) => state.newState ?? []));

    const clients = useObservableList(clientsRaw, (a, b) =>
        a.displayName.localeCompare(b.displayName)
    );
    return (
        <Page title="Clients">
            <Container sx={{ width: '50%' }}>
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    href={routes.createClient}
                >
                    Create
                </Button>
            </Container>
            <br />
            <Stack direction="column" bgcolor={alpha(colors.common.black, 0.4)}>
                <DataGrid
                    onRowClick={(row: GridRowParams<ClientSimple>) => {
                        window.location.href = routes.getClientDetails(
                            row.row.uuid
                        );
                    }}
                    rowSpacingType="margin"
                    autoHeight
                    rows={clients}
                    getRowId={(row: ClientSimple) => row.uuid}
                    columns={columns}
                />
            </Stack>
        </Page>
    );
}
