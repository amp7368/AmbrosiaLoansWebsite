import { Box } from '@mui/material';
import { PrivateRouteInfo } from '../../../routes/PrivateRouteInfo';
import { RouteInfo } from '../../../routes/RouteInfo';
import { PageWrapper } from '../PageWrapper';
import { MainPageProps, SideBarProps } from '../PageWrapperProps';

export class ClientPage extends PageWrapper<undefined> {
    listTabs(): undefined[] {
        return [];
    }
    createRoute(): RouteInfo {
        return new PrivateRouteInfo(this);
    }

    override renderMainPage(props: MainPageProps<undefined>): JSX.Element {
        return <Box>client</Box>;
    }
    renderSideBar(props: SideBarProps<undefined>): JSX.Element {
        return <Box />;
    }
}
