import { Box } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { AppTypography } from '.Typography';

export function gridDef(gridDef: GridColDef[]): GridColDef[] {
    return gridDef.map(
        (def): GridColDef => ({
            hideable: false,
            editable: false,
            width: 300,
            renderHeader: (props) => (
                <AppTypography color="text.secondary">
                    {props.colDef.headerName}
                </AppTypography>
            ),
            cellClassName: 'mui',
            renderCell: (props) => (
                <AppTypography color="text.secondary">
                    {props.value}
                </AppTypography>
            ),
            ...def,
        })
    );
}
