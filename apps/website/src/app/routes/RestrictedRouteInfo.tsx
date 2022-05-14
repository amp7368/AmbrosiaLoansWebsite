import { ObserveableToElement } from '@appleptr16/elemental';
import { Route, RouteProps } from 'react-router-dom';

import { selfUserQuery } from '../model/session/SelfUser.query';
import { IPageWrapper, RouteInfo } from './RouteInfo';

export abstract class RestrictedRouteInfo<Tab> extends RouteInfo<Tab> {
    protected abstract mapToElement(isLoggedIn: boolean): JSX.Element;
    constructor(props: IPageWrapper<Tab>) {
        super(props);
        this.mapToElement = this.mapToElement.bind(this);
    }
    override renderRouteProps(): RouteProps & { key: number } {
        const element = ObserveableToElement({
            original: selfUserQuery.isLoggedIn,
            mappingFn: this.mapToElement,
        });
        return {
            key: this.props.pageId,
            path: this.props.link,
            element: element,
        };
    }
}
