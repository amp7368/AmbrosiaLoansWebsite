import { ClientSimple } from '@api/io-model';
import { Optional } from '@appleptr16/utilities';
import { Box, Stack, Theme, useTheme } from '@mui/material';
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';

import { useClients } from '../../elf/client/Client.repository';
import { nav, navTo, urls } from '../../util/routes';
import { AppTypography } from '../../components/AppTypography';
import { AddButton } from '../../components/button/AddButton';
import {
    AppDataGrid,
    AppDataGridProps,
} from '../../components/grid/AppDataGrid';
import { gridDef } from '../../components/grid/GridDef';
import { Page } from '../../components/Page';
import { PageDataDisplay } from '../../components/PageDataDisplay ';

const columns: GridColDef[] = gridDef([
    { field: 'displayName', headerName: 'Name' },
    { field: 'mcName', headerName: 'Minecraft' },
    { field: 'discordTag', headerName: 'Discord' },
]);

export function ClientsPage() {
    const clients: ClientSimple[] = useClients();
    return (
        <Page title="Clients">
            <PageDataDisplay header={<AddButton href={urls.createClient} />}>
                <br />
                <AppDataGrid
                    showColumnRightBorder={true}
                    onRowClick={(row: GridRowParams<ClientSimple>) => {
                        navTo(nav.client.clientToURL(row.row.uuid));
                    }}
                    rowSpacingType="border"
                    showCellRightBorder
                    rows={clients}
                    getRowId={(row: ClientSimple) => row.uuid}
                    columns={columns}
                />
            </PageDataDisplay>
        </Page>
    );
}
