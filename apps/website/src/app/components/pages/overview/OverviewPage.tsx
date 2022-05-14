import { Box, Button, Container, Typography } from '@mui/material';

import { clearAppStorage } from '../../../../persistState';
import { RouteInfo } from '../../../routes/RouteInfo';
import { PageWrapperProps } from '../../../routes/routeProps';
import { SideDrawer } from '../../common/side/SideDrawer';
import { SideDrawerState } from '../../common/side/SideDrawerState';
import { PageWrapper } from '../PageWrapper';
import { SideBarProps, MainPageProps } from '../PageWrapperProps';

export class HomePage extends PageWrapper<HomePageTab> {
    createRoute(): RouteInfo<HomePageTab> {
        return new RouteInfo(this);
    }

    renderMainPage(props: MainPageProps<HomePageTab>): JSX.Element {
        return (
            <Box>
                <Typography>Overview</Typography>
                <Container>
                    <Button
                        onClick={clearAppStorage}
                        color="secondary"
                        variant="contained"
                    >
                        Reset Stores
                    </Button>
                </Container>
            </Box>
        );
    }
    renderSideBar(props: SideBarProps<HomePageTab>): JSX.Element {
        return (
            <SideDrawer
                drawerStates={
                    new Map([
                        [SideDrawerState.CLOSED, <h1>closed</h1>],
                        [SideDrawerState.OPEN, <h1>open</h1>],
                        [SideDrawerState.MORE_OPEN, <h1>moreOpen</h1>],
                        [SideDrawerState.EXPANDED, <h1>expanded</h1>],
                    ])
                }
                {...props}
            />
        );
    }
}
export enum HomePageTab {
    Main,
}
