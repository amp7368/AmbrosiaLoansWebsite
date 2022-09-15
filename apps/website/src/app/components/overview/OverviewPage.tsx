import { Button, Stack } from '@mui/material';

import { resetStores } from '../../elf/Elf';
import { Page } from '../common/Page';

export function OverviewPage() {
    return (
        <Page title="Overview" isPublic>
            <Stack direction="column">
                <Button variant="contained" onClick={() => resetStores()}>
                    Clear Stores
                </Button>
            </Stack>
        </Page>
    );
}
