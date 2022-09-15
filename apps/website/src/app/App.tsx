import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { ClientsPage } from './components/client-list/ClientsPage';
import { LoginPage } from './components/login/LoginPage';
import { OverviewPage } from './components/overview/OverviewPage';
import { urls } from './util/routes';
import { CreateClientPage } from './components/client-list/CreateClientPage';
import { LoansPage } from './components/loans/LoanPage';
import { CreateLoanPage } from './components/loans/CreateLoanPage';
import { ClientStatsPage } from './components/client/ClientStatsPage';

export function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={urls.home} element={<OverviewPage />} />
                <Route path={urls.client} element={<ClientsPage />} />
                <Route
                    path={urls.createClient}
                    element={<CreateClientPage />}
                />
                <Route path={urls.loan} element={<LoansPage />} />
                <Route path={urls.createLoan} element={<CreateLoanPage />} />
                <Route
                    path={urls.clientDetails}
                    element={<ClientStatsPage />}
                />
                <Route path={urls.login} element={<LoginPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
