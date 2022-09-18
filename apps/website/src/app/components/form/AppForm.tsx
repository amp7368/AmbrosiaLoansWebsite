import { alpha, Box, Stack } from '@mui/material';
import { ReactNode } from 'react';

import { AppPaper } from '../AppPaper';

type AppFormProps = React.ClassAttributes<HTMLFormElement> &
    React.FormHTMLAttributes<HTMLFormElement> & {
        actions: ReactNode[] | ReactNode;
    };
export function AppForm({ children, actions, ...props }: AppFormProps) {
    return (
        <AppPaper>
            <form {...props}>
                <Stack padding={2} spacing={3} alignItems="center">
                    <Stack padding={3} spacing={2} alignItems="start">
                        {children}
                    </Stack>
                    <Box width="100%">
                        <Stack direction="row" justifyContent="space-between">
                            {actions}
                        </Stack>
                    </Box>
                </Stack>
            </form>
        </AppPaper>
    );
}
