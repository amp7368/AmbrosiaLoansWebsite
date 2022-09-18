const pageBreadcrumbs: Record<string, string[]> = {
    '/': [], // overview
    // client related
    '/client': ['/'], // create client
    '/client/:clientId': ['/client'], // profile
    '/client/:clientId/withdraw': ['/client/:clientId'], // create loan
    // loan related
    '/loan': ['/'],
    '/loan/:loanId': ['/loan'],
    // auth related
    '/auth': ['/'], // signup or login
    '/auth/login': ['/auth'],
    '/auth/signup': ['/auth'],
};
export function useBreadcrumbs(): string[] {
    let href = location.href;
    if (href.endsWith('/') && href.length >= 1)
        href = href.substring(0, href.length - 1);
    const breadcrumbs = pageBreadcrumbs[href];
    if (breadcrumbs) return breadcrumbs;
    return ['/'];
}
export const nav = {
    client: {
        clientToURL: (client: string) => `/client/details/${client}`,
        fromURL: () => window.location.pathname.split('/')[3],
    },
    loan: {
        loanToURL: (loan: string) => `/loan/details/${loan}`,
        fromURL: () => window.location.pathname.split('/')[3],
    },
};
export function navTo(url: string, replace: ReplaceUrl = {}) {
    location.href = url;
}
