import { TabEntry, TabEntryKey } from '../../routes/routeProps';

export interface MainPageProps {
    currentTab: TabEntry;
}
export interface SideBarProps {
    currentTab: TabEntry;
    tabs: TabEntry[];
    setTab: (tab: TabEntryKey) => void;
}
