import { Navigate } from 'react-router-dom';
import { RestrictedRouteInfo } from './RestrictedRouteInfo';
import { PageId, AllRoutes, TabEntryKey } from './routeProps';

export class PublicOnlyRouteInfo<
    Tab extends TabEntryKey
> extends RestrictedRouteInfo<Tab> {
    protected mapToElement(isLoggedIn: boolean) {
        if (isLoggedIn) {
            // if you're logged in, don't log in again
            return (
                <Navigate to={AllRoutes[PageId.Client].link} replace={true} />
            );
        } else {
            return this.renderPage();
        }
    }
}
