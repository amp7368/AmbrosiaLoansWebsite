import { Box } from '@mui/material';
import { PrivateRouteInfo } from '../../../routes/PrivateRouteInfo';
import { RouteInfo } from '../../../routes/RouteInfo';
import { SideDrawer } from '../../common/side/SideDrawer';
import { SideDrawerState } from '../../common/side/SideDrawerState';
import { PageWrapper } from '../PageWrapper';
import { MainPageProps, SideBarProps } from '../PageWrapperProps';
import { ClientPageCreate } from './create/ClientPageCreate';
import { ClientPageList } from './list/ClientPageList';

export class ClientPage extends PageWrapper<ClientPageTab> {
    createRoute(): RouteInfo<ClientPageTab> {
        return new PrivateRouteInfo(this);
    }

    override renderMainPage(props: MainPageProps): JSX.Element {
        if (props.currentTab.isSame(ClientPageTab.LIST_CLIENTS)) {
            return <ClientPageList />;
        }
        if (props.currentTab.isSame(ClientPageTab.CREATE_CLIENT)) {
            return <ClientPageCreate />;
        }

        console.error('Client page has no tabs');
        return <h1>This shouldn't be possible?</h1>;
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
    CREATE_CLIENT,
    LIST_CLIENTS,
}
