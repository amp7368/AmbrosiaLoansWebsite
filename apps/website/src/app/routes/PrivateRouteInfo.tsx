import { Navigate } from 'react-router-dom';

import { RestrictedRouteInfo } from './RestrictedRouteInfo';
import { PageId, AllRoutes } from './routeProps';

export class PrivateRouteInfo<Tab> extends RestrictedRouteInfo<Tab> {
    protected mapToElement(isLoggedIn: boolean) {
        if (isLoggedIn) {
            return this.renderPage();
        } else {
            // if you're not logged in, log in
            return <Navigate to={AllRoutes[PageId.Auth].link} replace={true} />;
        }
    }
}
