export const urls = {
    home: '/',
    login: '/login',
    client: '/client',
    clientDetails: '/client/details/:clientId',
    createClient: '/client/create',
    loan: '/loan',
    loanDetails: '/loan/details/:loan',
    createLoan: '/loan/create',
};
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
export function navTo(url: string) {
    window.location.href = url;
}
