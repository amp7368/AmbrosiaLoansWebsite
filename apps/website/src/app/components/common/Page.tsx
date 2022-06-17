import { Container, Stack, Typography } from '@mui/material';
import { ReactNode } from 'react';
import { AppPaper } from './AppPaper';

export interface PageProps {
    title: string;
    children: ReactNode;
}
export function Page(props: PageProps) {
    return (
        <Stack direction="column" alignItems="center">
            <Typography variant="h2" textTransform="capitalize">
                {props.title}
            </Typography>
            <br />
            <Container>
                <AppPaper sx={{ padding: 3 }}>{props.children}</AppPaper>
            </Container>
        </Stack>
    );
}
