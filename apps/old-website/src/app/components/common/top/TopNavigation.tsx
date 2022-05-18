import { Box, Button, Stack } from '@mui/material';

import {
    AllRoutes,
    PageId,
    PageWrapperProps,
} from '../../../routes/routeProps';
import { LightShadowText } from '../../base/AppTypography';

interface AppBarLinkProps {
    route: PageWrapperProps<number>;
    render?: (name: string) => JSX.Element;
}
function AppBarLink({ route, render }: AppBarLinkProps): JSX.Element {
    const changeRoute = () => window.location.replace(route.link);
    return (
        <Button variant="text" onClick={changeRoute}>
            <LightShadowText variant="h2" color="text.primary" fontStyle={{}}>
                {render ? render(route.title) : route.title}
            </LightShadowText>
        </Button>
    );
}
const renderHomeButton = () => (
    // TODO: clean up magic
    <Box width="10rem" height="10rem" margin="-4rem" marginLeft="-3rem"></Box>
);

export function TopNavigation() {
    const HomeButton = (
        <AppBarLink
            key="home"
            route={AllRoutes[PageId.Home]}
            render={renderHomeButton}
        />
    );
    let buttons = [AllRoutes[PageId.Client], AllRoutes[PageId.Auth]].map(
        (route, i) => <AppBarLink key={i} route={route} />
    );
    buttons = [HomeButton, ...buttons].map((button, i) => (
        <Box width="5rem" height="5rem" key={i}>
            {button}
        </Box>
    ));
    return (
        <Stack
            width="100vw"
            padding="2rem"
            boxSizing="border-box"
            direction="row"
            bgcolor="primary.main"
            spacing="1"
            justifyContent="space-between"
        >
            {buttons}
            <Box />
        </Stack>
    );
}
