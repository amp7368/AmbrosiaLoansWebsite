import { Stack } from '@mui/material';

import { DarkShadowText } from '../../base/AppTypography';
import { LoginForm } from './LoginForm';

const welcomeRow = (
    <Stack
        direction="row"
        padding={4}
        justifyContent="space-between"
        bgcolor="primary.light"
        alignItems="center"
    >
        <DarkShadowText color="text.primary" fontSize="2rem" fontWeight="bold">
            Welcome to
            <br />
            Ambrosia Loans!
        </DarkShadowText>
    </Stack>
);
export function AuthSideDrawer() {
    return (
        <Stack direction="column" justifyContent="stretch">
            {welcomeRow}
            {<LoginForm />}
        </Stack>
    );
}
