import { Card, Grid, ImageList, Stack } from '@mui/material';
import { ReactFragment, ReactNode } from 'react';

import { AppTypography } from '../../components/AppTypography';

export interface ClientStatsActionProps {
    title: string;
    onClick: () => void;
}
export interface ClientStatsSectionProps {
    title: string;
    actions: ReactNode | ReactNode[];
    content: ReactFragment;
}
export function ClientStatsSection(props: ClientStatsSectionProps) {
    return (
        <Stack padding={3} spacing={2}>
            <Stack spacing={1} direction="row">
                <AppTypography variant="h4" color="text.secondary">
                    {props.title}
                </AppTypography>
                <Stack>{props.actions}</Stack>
            </Stack>
            <ImageList variant="quilted" cols={3} gap={6}>
                {props.content}
            </ImageList>
        </Stack>
    );
}
