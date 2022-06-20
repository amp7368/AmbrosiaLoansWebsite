import { ClientSimple } from '@api/io-model';
import { Box, Card, Stack } from '@mui/material';
import { ReactNode } from 'react';
import { AppPaper } from '../../common/AppPaper';

import { AppTypography } from '../../common/AppTypography';

interface StatProps {
    title: string;
    value: ReactNode;
    uuid: ReactNode;
}
function Stat(props: StatProps) {
    return (
        <Card>
            <Stack
                direction="column"
                color="primary.contrastText"
                justifyContent="space-between"
                padding={1}
            >
                <AppTypography variant="h4">{props.title}</AppTypography>
                <AppTypography variant="h5">{props.value}</AppTypography>
                <AppTypography variant="body1">{props.uuid}</AppTypography>
            </Stack>
        </Card>
    );
}
export function ClientStatsUserInfo({ client }: { client: ClientSimple }) {
    return (
        <AppPaper>
            <AppTypography variant="h4" color="text.primary">
                User info
            </AppTypography>
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
