export const urls = {
    home: '/',
    createClient: '/client/create',
    client: '/client',
    login: '/login',
    loan: '/loan',
    createLoan: '/loan/create',
    clientDetails: '/client/stats/:clientId',
};
export const nav = {
    client: {
        clientToURL: (client: string) => `/client/stats/${client}`,
        fromURL: () => window.location.pathname.split('/')[3],
    },
};
export function navTo(url: string) {
    window.location.href = url;
}
