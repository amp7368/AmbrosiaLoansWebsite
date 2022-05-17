import { RouteProps } from 'react-router-dom';

import { PageWrapperSkeleton, TabEntryKey } from './routeProps';

export interface IPageWrapper<Tab extends TabEntryKey> {
    props: PageWrapperSkeleton<Tab>;
    PageElement(): JSX.Element;
}

export class RouteInfo<Tab extends TabEntryKey> {
    props: PageWrapperSkeleton<Tab>;
    page: IPageWrapper<Tab>;
    constructor(page: IPageWrapper<Tab>) {
        this.props = page.props;
        this.page = page;
        this.renderPage = this.renderPage.bind(this);
    }
    getName(): string {
        return this.props.title;
    }
    renderRouteProps(): RouteProps & { key: number } {
        return {
            key: this.props.pageId,
            path: this.props.link,
            element: <this.renderPage />,
        };
    }
    renderPage(): JSX.Element {
        return this.page.PageElement();
    }
}
