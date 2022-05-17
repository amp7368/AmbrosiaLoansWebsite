import { AuthPage, AuthPageTab } from '../components/pages/auth/AuthPage';
import {
    ClientPage,
    ClientPageTab,
} from '../components/pages/client/ClientPage';
import {
    HomePage,
    HomePageTab,
} from '../components/pages/overview/OverviewPage';

import { PageWrapper } from '../components/pages/PageWrapper';

export type EnumType = Record<string, number> | Record<number, string>;
export class TabEntry {
    key(): TabEntryKey {
        return this.num;
    }
    str: string;
    num: number;
    constructor(str: string, num: number) {
        this.str = str;
        this.num = num;
    }
    isSame<Tab>(tab: Tab) {
        if (typeof tab === 'number') return tab === this.num;
        if (typeof tab === 'string') return tab === this.str;
        return false;
    }
}
export type TabEntryKey = string | number;
export interface PageWrapperProps<Tab extends TabEntryKey> {
    pageId: PageId;
    page: PageWrapper<Tab>;
    title: string;
    link: string;
    tabs: TabEntry[];
    tabType: EnumType;
    create: (props: PageWrapperSkeleton<Tab>) => PageWrapper<Tab>;
}
export type PageWrapperSkeleton<Tab extends TabEntryKey> = Omit<
    PageWrapperProps<Tab>,
    'page'
>;
export type PageWrapperSkeletonCreate<Tab extends TabEntryKey> = Omit<
    PageWrapperProps<Tab>,
    'tabs' | 'page'
>;

export enum PageId {
    Home,
    Client,
    Auth,
}

function createRoute<T extends TabEntryKey>(
    props: PageWrapperSkeletonCreate<T>
): PageWrapperProps<T> {
    const tabs = Object.entries(props.tabType);
    const tabEntries: TabEntry[] = [];
    for (const tab of tabs) {
        const key = tab[0];
        const value = tab[1];
        if (typeof key === 'string' && typeof value === 'number') {
            tabEntries.push(new TabEntry(key, value));
        } else if (typeof value === 'string' && typeof key === 'number') {
            tabEntries.push(new TabEntry(value, key));
        }
    }
    return {
        ...props,
        tabs: tabEntries,
        page: props.create({ ...props, tabs: tabEntries }),
    };
}
export const AllPageIds: PageId[] = [PageId.Home, PageId.Client, PageId.Auth];
export const AllRoutes: Record<PageId, PageWrapperProps<number>> = {
    [PageId.Home]: createRoute({
        pageId: PageId.Home,
        title: 'Overview',
        link: '/',
        create: (props) => new HomePage(props),
        tabType: HomePageTab,
    } as PageWrapperSkeletonCreate<HomePageTab>),
    [PageId.Auth]: createRoute({
        pageId: PageId.Auth,
        title: 'Auth',
        link: '/auth',
        create: (props) => new AuthPage(props),
        tabType: AuthPageTab,
    } as PageWrapperSkeletonCreate<AuthPageTab>),
    [PageId.Client]: createRoute({
        pageId: PageId.Client,
        title: 'Clients',
        link: '/clients',
        create: (props) => new ClientPage(props),
        tabType: ClientPageTab,
    } as PageWrapperSkeletonCreate<ClientPageTab>),
};
