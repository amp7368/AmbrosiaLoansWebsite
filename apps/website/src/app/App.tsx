import { CssBaseline } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { ClientsPage } from './components/clients/ClientsPage';
import { AppHeader } from './components/common/AppHeader';
import { AuthorizedPage } from './components/common/AuthorizedPage';
import { LoginPage } from './components/login/LoginPage';
import { OverviewPage } from './components/overview/OverviewPage';
import { urls } from './util/routes';
import { CreateClientPage } from './components/clients/CreateClientPage';
import { LoansPage } from './components/loans/LoanPage';
import { CreateLoanPage } from './components/loans/CreateLoanPage';
import { ClientStats } from './components/clients/stats/ClientStats';

export function App() {
    return (
        <>
            <CssBaseline />
            <AppHeader />
            <BrowserRouter>
                <Routes>
                    <Route path={urls.home} element={<OverviewPage />} />
                    <Route
                        path={urls.client}
                        element={
                            <AuthorizedPage>
                                <ClientsPage />
                            </AuthorizedPage>
                        }
                    />
                    <Route
                        path={urls.createClient}
                        element={
                            <AuthorizedPage>
                                <CreateClientPage />
                            </AuthorizedPage>
                        }
                    />
                    <Route
                        path={urls.loan}
                        element={
                            <AuthorizedPage>
                                <LoansPage />
                            </AuthorizedPage>
                        }
                    />
                    <Route
                        path={urls.createLoan}
                        element={
                            <AuthorizedPage>
                                <CreateLoanPage />
                            </AuthorizedPage>
                        }
                    />
                    <Route
                        path={urls.clientDetails}
                        element={
                            <AuthorizedPage>
                                <ClientStats />
                            </AuthorizedPage>
                        }
                    />
                    <Route path={urls.login} element={<LoginPage />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
