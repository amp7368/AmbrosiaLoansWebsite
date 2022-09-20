import { ExceptionFactory } from '../base/ExceptionFactory';

export function trimAuthorizationHeader(starting: string, request: unknown) {
    const header: string = getAuthHeader(request);
    if (!header.startsWith(starting)) {
        ExceptionFactory.instance.badRequest('Bad authorization format');
        return '';
    }
    return header.substring(starting.length);
}
function getAuthHeader(request: any): string {
    try {
        const auth = request.headers.authorization;
        if (auth) return auth;
    } catch (e) {}
    ExceptionFactory.instance.badRequest('No authorization header');
    return '';
}
