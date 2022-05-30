import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { AppBar, Button, Stack, Typography, useTheme } from '@mui/material';
import { routes } from '../../util/routes';

function AppLink(props: { route: string; title: string }) {
    return (
        <Button
            color="secondary"
            variant="text"
            disableElevation={true}
            href={props.route}
        >
            <Typography variant="h6">{props.title}</Typography>
        </Button>
    );
}

export function AppHeader() {
    const height = useTheme().spacing(7);
    return (
        <AppBar position="static" enableColorOnDark={true} sx={{ height }}>
            <Stack
                height="100%"
                direction="row"
                alignItems="center"
                justifyContent="space-around"
                spacing={0}
            >
                <Button
                    color="secondary"
                    variant="text"
                    disableElevation={true}
                    href={routes.home}
                >
                    <AccountBalanceIcon color="secondary" fontSize="large" />
                </Button>
                <Stack
                    width="50%"
                    direction="row"
                    alignItems="center"
                    justifyContent="flex-end"
                    spacing={3}
                >
                    <AppLink route={routes.client} title="Client" />
                    <AppLink route={routes.login} title="Login" />
                </Stack>
            </Stack>
        </AppBar>
    );
}
