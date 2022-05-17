import { PublicOnlyRouteInfo } from '../../../routes/PublicOnlyRouteInfo';
import { RouteInfo } from '../../../routes/RouteInfo';
import { SideDrawer } from '../../common/side/SideDrawer';
import { SideDrawerState } from '../../common/side/SideDrawerState';
import { PageWrapper } from '../PageWrapper';
import { MainPageProps, SideBarProps } from '../PageWrapperProps';
import { AuthSideDrawer } from './AuthSideBar';

export class AuthPage extends PageWrapper<AuthPageTab> {
    createRoute(): RouteInfo<AuthPageTab> {
        return new PublicOnlyRouteInfo(this);
    }

    renderMainPage(props: MainPageProps): JSX.Element {
        return <h1>hi</h1>;
    }
    renderSideBar(props: SideBarProps): JSX.Element {
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

export enum AuthPageTab {
    Main,
}
