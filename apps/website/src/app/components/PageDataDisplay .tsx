import { Box, Divider, Stack } from '@mui/material';
import { ReactNode } from 'react';
import { AppPaper } from './AppPaper';

export type PageDataDisplayProps = {
    children: ReactNode | ReactNode[];
    header?: ReactNode;
};
export function PageDataDisplay(props: PageDataDisplayProps) {
    return (
        <AppPaper
            sx={{
                width: '100%',
                borderStyle: 'none',
                bgcolor: 'background.default',
            }}
        >
            <Stack padding={2} spacing={3}>
                <Stack direction="row" justifyContent="center">
                    {props.header}
                </Stack>
                {props.children}
            </Stack>
        </AppPaper>
    );
}
