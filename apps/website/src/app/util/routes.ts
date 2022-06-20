export const routes = {
    home: '/',
    createClient: '/client/create',
    client: '/client',
    login: '/login',
    loan: '/loan',
    createLoan: '/loan/create',
    clientDetails: '/client/stats/:clientId',
    getClientDetails: (client: string) => `/client/stats/${client}`,
    fromClientDetails: (url: string) => url.split('/')[3],
};
