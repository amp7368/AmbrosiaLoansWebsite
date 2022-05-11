import { AuthPage } from '../components/pages/auth/AuthPage';
import { ClientPage } from '../components/pages/client/ClientPage';
import { HomePage } from '../components/pages/overview/OverviewPage';
import { PageId, PageWrapperProps, RouteProps } from './routeProps';

function createProps(
    pageType: PageId,
    title: string,
    link: string
): PageWrapperProps {
    return {
        pageType: pageType,
        title: title,
        link: link,
    } as PageWrapperProps;
}
export const AllRoutes = {
    Home: new HomePage(RouteProps.Home).createRoute(),
    Auth: new AuthPage(RouteProps.Auth).createRoute(),
    Client: new ClientPage(RouteProps.Client).createRoute(),
};
