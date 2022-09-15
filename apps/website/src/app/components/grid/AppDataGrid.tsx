import { SxProps, Theme } from '@mui/material';
import { DataGrid, DataGridProps } from '@mui/x-data-grid';

export type AppDataGridProps = DataGridProps & {
    borderColor?: string;
    borderSecondColor?: string;
};
export function AppDataGrid({
    borderColor = 'secondary.light',
    borderSecondColor = 'primary.light',
    ...props
}: AppDataGridProps) {
    const borderProps: SxProps<Theme> = {
        borderWidth: '1px',
        borderColor,
    };

    return (
        <DataGrid
            autoHeight
            {...props}
            sx={{
                ...borderProps,
                borderStyle: 'solid',
                '& .MuiDataGrid-columnHeader': {
                    ...borderProps,
                    borderStyle: 'none solid none none',
                },
                '& .MuiDataGrid-cell': {
                    ...borderProps,
                    borderStyle: 'solid solid none none',
                },
                '& .MuiDataGrid-footerContainer': {
                    ...borderProps,
                    borderStyle: 'solid solid none none',
                },
            }}
        />
    );
}
