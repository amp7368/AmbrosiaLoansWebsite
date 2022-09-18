import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { ClientsPage } from './pages/client-list/ClientsPage';
import { LoginPage } from './pages/login/LoginPage';
import { OverviewPage } from './pages/overview/OverviewPage';
import { urls } from './util/routes';
import { CreateClientPage } from './pages/client-list/CreateClientPage';
import { LoansPage } from './pages/loans/LoanPage';
import { CreateLoanPage } from './pages/loans/CreateLoanPage';
import { ClientStatsPage } from './pages/client/ClientStatsPage';

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
