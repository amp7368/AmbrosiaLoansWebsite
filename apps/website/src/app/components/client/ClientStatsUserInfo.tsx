import { ClientSimple } from '@api/io-model';
import { Box, Container, Divider, Stack } from '@mui/material';
import { ReactNode } from 'react';

import { AppPaper } from '../common/AppPaper';
import { AppTypography } from '../common/AppTypography';

interface StatProps {
    title: string;
    value: ReactNode;
    uuid: ReactNode;
}
function Stat(props: StatProps) {
    return (
        <Stack
            direction="column"
            color="text.secondary"
            spacing={1}
            padding={1}
        >
            <AppTypography variant="h4" sx={{ textDecoration: 'underline' }}>
                {props.title}
            </AppTypography>
            <AppTypography variant="h5">{props.value ?? 'N/A'}</AppTypography>
            <AppTypography variant="body1">{props.uuid}</AppTypography>
        </Stack>
    );
}
export function ClientStatsUserInfo({ client }: { client: ClientSimple }) {
    return (
        <AppPaper>
            <Stack direction="row">
                <Stat
                    title={'Minecraft'}
                    value={client.mcName}
                    uuid={client.mcId}
                />
                <Stat
                    title={'Discord'}
                    value={client.discordTag}
                    uuid={client.discordId}
                />
            </Stack>
        </AppPaper>
    );
}
