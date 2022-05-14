import { PublicOnlyRouteInfo } from '../../../routes/PublicOnlyRouteInfo';
import { RouteInfo } from '../../../routes/RouteInfo';
import { SideDrawer } from '../../common/side/SideDrawer';
import { SideDrawerState } from '../../common/side/SideDrawerState';
import { PageWrapper } from '../PageWrapper';
import { MainPageProps, SideBarProps } from '../PageWrapperProps';
import { AuthSideDrawer } from './AuthSideBar';

export class AuthPage extends PageWrapper<AuthPageTabs> {
    createRoute(): RouteInfo<AuthPageTabs> {
        return new PublicOnlyRouteInfo(this);
    }

    renderMainPage(props: MainPageProps<AuthPageTabs>): JSX.Element {
        return <></>;
    }
    renderSideBar(props: SideBarProps<AuthPageTabs>): JSX.Element {
        return (
            <SideDrawer
                defaultState={SideDrawerState.EXPANDED}
                drawerStates={
                    new Map([[SideDrawerState.EXPANDED, <AuthSideDrawer />]])
                }
                {...props}
            />
        );
    }
}

export enum AuthPageTabs {
    Main,
}
