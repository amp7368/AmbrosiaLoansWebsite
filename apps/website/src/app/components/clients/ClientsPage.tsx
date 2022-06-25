import { ClientSimple } from '@api/io-model';
import { alpha, Button, colors, Container, Stack } from '@mui/material';
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';

import { useClients } from '../../elf/client/Client.repository';
import { nav, navTo, urls } from '../../util/routes';
import { Page } from '../common/Page';

const columns: GridColDef[] = [
    { field: 'displayName', headerName: 'Name', width: 200 },
    { field: 'mcName', headerName: 'Minecraft', width: 200 },
    { field: 'discordTag', headerName: 'Discord', width: 200 },
];

export function ClientsPage() {
    const clients = useClients();
    return (
        <Page title="Clients">
            <Container sx={{ width: '50%' }}>
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    href={urls.createClient}
                >
                    Create
                </Button>
            </Container>
            <br />
            <Stack direction="column" bgcolor={alpha(colors.common.black, 0.4)}>
                <DataGrid
                    onRowClick={(row: GridRowParams<ClientSimple>) => {
                        navTo(nav.client.clientToURL(row.row.uuid));
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
