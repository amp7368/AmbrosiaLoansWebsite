import { Optional } from '@appleptr16/utilities';
import { useIsLoggedIn } from './app/elf/self-user/SelfUser.repository';
import { navTo } from './app/util/routes';

export function RouteRules() {
    const isLoggedIn: Optional<boolean> = useIsLoggedIn();
    if (isLoginPage()) verifyNotLoggedIn(isLoggedIn);
    if (isAuthorizedPage()) verifyLoggedIn(isLoggedIn);

    return null;
}
function isLoginPage() {
    return location.href.startsWith('/auth');
}
function isAuthorizedPage() {
    return !location.href.startsWith('/auth') && location.href !== '/';
}

function verifyNotLoggedIn(isLoggedIn: Optional<boolean>) {
    if (isLoggedIn) navTo('/');
}
function verifyLoggedIn(isLoggedIn: Optional<boolean>) {
    if (isLoggedIn === false) navTo('/login');
}
