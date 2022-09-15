import { LoanSimple } from '@api/io-model';
import { alpha, Button, colors, Container, Stack } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { useListLoans } from '../../elf/loan/Loan.repository';
import { urls } from '../../util/routes';
import { EmeraldDisplay } from '../common/emerald/EmeraldDisplay';
import { EmeraldDisplayHeader } from '../common/emerald/EmeraldDisplayHeader';
import { AppDataGrid } from '../common/grid/AppDataGrid';
import { gridDef } from '../common/grid/GridDef';
import { Page } from '../common/Page';
import { PageDataDisplay } from '../common/PageDataDisplay ';

const columns: GridColDef[] = gridDef([
    { field: 'broker', headerName: 'Broker' },
    {
        field: 'currentLoan',
        headerName: 'Current Loan',
        type: 'number',
        renderCell: (ems) => (
            <EmeraldDisplay length="short" emeralds={ems.value} />
        ),
        renderHeader: EmeraldDisplayHeader,
    },
    {
        field: 'rate',
        headerName: 'Rate %',
        valueFormatter: (rate) => `${rate.value}%`,
    },
]);

export function LoansPage() {
    const loans = useListLoans();

    return (
        <Page title="Loans">
            <PageDataDisplay header={null}>
                <br />
                <AppDataGrid
                    rows={loans}
                    getRowId={(row: LoanSimple) => row.uuid}
                    columns={columns}
                />
            </PageDataDisplay>
        </Page>
    );
}
