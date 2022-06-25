import { ObservableTernary } from '@appleptr16/elemental';
import { Navigate } from 'react-router-dom';
import { useIsLoggedIn } from '../../elf/self-user/SelfUser.repository';

import { navTo, urls } from '../../util/routes';

export function AuthorizedPage(props: { children: JSX.Element }) {
    const isLoggedIn = useIsLoggedIn();
    if (!isLoggedIn) navTo(urls.login);
    return props.children;
}
