import { ObservableTernary } from '@appleptr16/elemental';
import { Navigate } from 'react-router-dom';

import { selfUserQuery } from '../../akita/self-user/SelfUser.query';
import { routes } from '../../util/routes';

export function AuthorizedPage(props: { children: JSX.Element }) {
    return (
        <ObservableTernary
            observable={selfUserQuery.isLoggedIn$}
            onTrue={() => props.children}
            onFalse={() => <Navigate to={routes.login} />}
        />
    );
}
