import { Box } from '@mui/material';
import { PrivateRouteInfo } from '../../../routes/PrivateRouteInfo';
import { RouteInfo } from '../../../routes/RouteInfo';
import { SideDrawer } from '../../common/side/SideDrawer';
import { SideDrawerState } from '../../common/side/SideDrawerState';
import { PageWrapper } from '../PageWrapper';
import { MainPageProps, SideBarProps } from '../PageWrapperProps';
import { ClientPageList } from './ClientPageList';

export class ClientPage extends PageWrapper<ClientPageTab> {
    createRoute(): RouteInfo<ClientPageTab> {
        return new PrivateRouteInfo(this);
    }

    override renderMainPage(props: MainPageProps): JSX.Element {
        console.log(props.currentTab);
        if (props.currentTab.isSame(ClientPageTab.LIST_CLIENTS)) {
            console.log('hey');
            return <ClientPageList />;
        }
        return <Box> hei</Box>;
    }
    renderSideBar(props: SideBarProps): JSX.Element {
        return (
            <SideDrawer
                drawerStates={
                    new Map([[SideDrawerState.OPEN, <Box>sideDrawer</Box>]])
                }
                {...props}
            />
        );
    }
}
export enum ClientPageTab {
    LIST_CLIENTS,
    CREATE_CLIENT,
}
