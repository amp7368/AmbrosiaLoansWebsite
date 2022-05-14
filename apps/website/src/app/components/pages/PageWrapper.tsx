import { Box } from '@mui/material';
import { useState, useMemo, useRef } from 'react';

import { IPageWrapper, RouteInfo } from '../../routes/RouteInfo';
import { PageWrapperProps, PageWrapperSkeleton } from '../../routes/routeProps';
import { TopNavigation } from '../common/top/TopNavigation';
import { MainPageProps, SideBarProps } from './PageWrapperProps';

interface PageProps<Tab> {
    page: PageWrapper<Tab>;
}
interface PageState<Tab> {
    currentTab: Tab;
}
function Page<Tab>({ page }: PageProps<Tab>) {
    const tabs = useRef(page.listTabs());
    const [state, setState] = useState({
        currentTab: tabs.current[0],
    } as PageState<Tab>);

    const sideBarProps: SideBarProps<Tab> = {
        tabs: tabs.current,
        currentTab: state.currentTab,
        setTab: (tab: Tab) => {
            setState((state: PageState<Tab>) => ({
                ...state,
                currentTab: tab,
            }));
        },
    };
    return (
        <Box width="100vw" height="100vh" display="flex" flexDirection="column">
            <page.renderTopNav />
            <Box display="flex" flexGrow={1}>
                <page.renderSideBar {...sideBarProps} />
                <page.renderMainPage currentTab={state.currentTab} />
            </Box>
        </Box>
    );
}

export abstract class PageWrapper<Tab> implements IPageWrapper<Tab> {
    private currentTabVar: Tab;
    private tabs: Tab[];
    constructor(public props: PageWrapperSkeleton<Tab>) {
        this.currentTabVar = props.tabs[0];
        this.tabs = props.tabs;
        this.renderSideBar = this.renderSideBar.bind(this);
        this.setTab = this.setTab.bind(this);
    }
    abstract createRoute(): RouteInfo<Tab>;

    listTabs() {
        return this.tabs;
    }
    protected setTab(newTab: Tab): void {
        this.currentTabVar = newTab;
    }
    protected get currentTab(): Tab {
        return this.currentTabVar;
    }
    PageElement(): JSX.Element {
        return <Page page={this} />;
    }
    renderTopNav(): JSX.Element {
        return <TopNavigation />;
    }
    abstract renderMainPage(props: MainPageProps<Tab>): JSX.Element;
    abstract renderSideBar(props: SideBarProps<Tab>): JSX.Element;
}
