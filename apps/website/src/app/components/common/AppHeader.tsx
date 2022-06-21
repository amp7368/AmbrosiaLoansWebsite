import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import {
    AppBar,
    Button,
    Divider,
    Stack,
    Typography,
    useTheme,
} from '@mui/material';
import { urls } from '../../util/routes';

function AppLink(props: { route: string; title: string }) {
    return (
        <Button color="secondary" variant="text" href={props.route}>
            <Typography color="primary.contrastText" variant="h4">
                {props.title}
            </Typography>
        </Button>
    );
}

export function AppHeader() {
    return (
        <AppBar
            position="static"
            enableColorOnDark={true}
            sx={{ height: '4rem' }}
        >
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
                    href={urls.home}
                >
                    <AccountBalanceIcon color="secondary" fontSize="large" />
                </Button>
                <Stack
                    width="50%"
                    direction="row"
                    alignItems="center"
                    justifyContent="flex-end"
                    spacing={3}
                    divider={
                        <Divider
                            variant="fullWidth"
                            color="secondary"
                            orientation="vertical"
                        />
                    }
                >
                    <AppLink route={urls.loan} title="Loan" />
                    <AppLink route={urls.client} title="Client" />
                    <AppLink route={urls.login} title="Login" />
                </Stack>
            </Stack>
        </AppBar>
    );
}
