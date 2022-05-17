import { Optional } from '@appleptr16/utilities';
import { Box } from '@mui/material';
import { useMemo, useRef, useState } from 'react';

import { IPageWrapper, RouteInfo } from '../../routes/RouteInfo';
import {
    PageWrapperSkeleton,
    TabEntry,
    TabEntryKey,
} from '../../routes/routeProps';
import { TopNavigation } from '../common/top/TopNavigation';
import { MainPageProps, SideBarProps } from './PageWrapperProps';

interface PageProps<Tab extends TabEntryKey> {
    page: PageWrapper<Tab>;
}
interface PageState<Tab> {
    currentTab: Tab;
}
function Page<Tab extends TabEntryKey>({ page }: PageProps<Tab>) {
    const tabs: TabEntry[] = page.listTabs();
    const [state, setState] = useState<PageState<TabEntry>>({
        currentTab: tabs[0],
    });
    const sideBarProps: SideBarProps = {
        tabs,
        currentTab: state.currentTab,
        setTab: (newTab: string | number) => {
            const matchingTabEntry: Optional<TabEntry> = tabs.find(
                (tab) => tab.str == newTab || tab.num == newTab
            );
            if (matchingTabEntry !== undefined) {
                setState((state: PageState<TabEntry>) => ({
                    ...state,
                    currentTab: matchingTabEntry,
                }));
            } else {
                console.error(`${newTab} tab not found`);
            }
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

export abstract class PageWrapper<Tab extends TabEntryKey>
    implements IPageWrapper<Tab>
{
    private currentTabVar: TabEntry;
    private tabs: TabEntry[];
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
        const find = this.tabs.find((tab) => tab.isSame(newTab));
        if (find) this.currentTabVar = find;
    }
    protected get currentTab(): TabEntry {
        return this.currentTabVar;
    }
    PageElement(): JSX.Element {
        return <Page page={this} />;
    }
    renderTopNav(): JSX.Element {
        return <TopNavigation />;
    }
    abstract renderMainPage(props: MainPageProps): JSX.Element;
    abstract renderSideBar(props: SideBarProps): JSX.Element;
}
