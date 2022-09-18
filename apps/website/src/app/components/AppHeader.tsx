import { AppBar, Button, Divider, Stack } from '@mui/material';

import { urls } from '../util/routes';
import { AppBreadcrumbs } from './AppBreadcrumbs';
import { AppTypography } from './AppTypography';
import { Logo } from './Logo';

interface AppLinkProps {
    route: string;
    title: string;
}
function AppLink(props: AppLinkProps) {
    const color =
        location.pathname === props.route
            ? 'secondary'
            : 'primary.contrastText';
    return (
        <Button variant="text" color="secondary" href={props.route}>
            <AppTypography color={color} variant="h4">
                {props.title}
            </AppTypography>
        </Button>
    );
}

export function AppHeader() {
    const appBarColor = '#333333';
    return (
        <Stack marginBottom={3}>
            <AppBar
                position="static"
                sx={{
                    bgcolor: appBarColor,
                    zIndex: (theme) => theme.zIndex.appBar,
                }}
            >
                <Stack
                    height="4rem"
                    justifyContent="flex-start"
                    spacing={4}
                    alignItems="center"
                    direction="row"
                    divider={
                        <Divider
                            flexItem
                            orientation="vertical"
                            variant="fullWidth"
                        />
                    }
                >
                    <Logo />
                    <AppLink route={urls.loan} title="Loan" />
                    <AppLink route={urls.client} title="Client" />
                    <AppLink route={urls.login} title="Login" />
                </Stack>
            </AppBar>
        </Stack>
    );
}
