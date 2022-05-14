import {
    AuthPage,
    AuthPageTabs as AuthPageTab,
} from '../components/pages/auth/AuthPage';
import {
    ClientPage,
    ClientPageTab,
} from '../components/pages/client/ClientPage';
import {
    HomePage,
    HomePageTab,
} from '../components/pages/overview/OverviewPage';

import { PageWrapper } from '../components/pages/PageWrapper';

export interface PageWrapperProps<Tab> {
    pageId: PageId;
    page: PageWrapper<Tab>;
    title: string;
    link: string;
    tabs: Tab[];
    create: (props: PageWrapperSkeleton<Tab>) => PageWrapper<Tab>;
}
export type PageWrapperSkeleton<Tab> = Omit<PageWrapperProps<Tab>, 'page'>;

export enum PageId {
    Home,
    Client,
    Auth,
}
function createRoute<T>(props: PageWrapperSkeleton<T>): PageWrapperProps<T> {
    props.tabs = props.tabs.filter((tab) => typeof tab !== 'number');
    return { ...props, page: props.create(props) };
}
export const AllPageIds: PageId[] = [PageId.Home, PageId.Client, PageId.Auth];
export const AllRoutes: Record<PageId, PageWrapperProps<number>> = {
    [PageId.Home]: createRoute({
        pageId: PageId.Home,
        title: 'Overview',
        link: '/',
        create: (props) => new HomePage(props),
        tabs: Object.values(HomePageTab),
    } as PageWrapperSkeleton<HomePageTab>),
    [PageId.Auth]: createRoute({
        pageId: PageId.Auth,
        title: 'Auth',
        link: '/auth',
        create: (props) => new AuthPage(props),
        tabs: Object.values(AuthPageTab),
    } as PageWrapperSkeleton<AuthPageTab>),
    [PageId.Client]: createRoute({
        pageId: PageId.Client,
        title: 'Clients',
        link: '/clients',
        create: (props) => new ClientPage(props),
        tabs: Object.values(ClientPageTab),
    } as PageWrapperSkeleton<ClientPageTab>),
};
