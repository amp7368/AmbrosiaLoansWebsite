import { CssBaseline } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { ClientsPage } from './components/clients/ClientsPage';
import { AppHeader } from './components/base/AppHeader';
import { AuthorizedPage } from './components/base/AuthorizedPage';
import { LoginPage } from './components/login/LoginPage';
import { OverviewPage } from './components/overview/OverviewPage';
import { routes } from './util/routes';
import { CreateClientPage } from './components/clients/CreateClientPage';

export function App() {
    return (
        <>
            <CssBaseline />
            <AppHeader />
            <BrowserRouter>
                <Routes>
                    <Route path={routes.home} element={<OverviewPage />} />
                    <Route
                        path={routes.client}
                        element={
                            <AuthorizedPage>
                                <ClientsPage />
                            </AuthorizedPage>
                        }
                    />
                    <Route
                        path={routes.createClient}
                        element={
                            <AuthorizedPage>
                                <CreateClientPage />
                            </AuthorizedPage>
                        }
                    />
                    <Route path={routes.login} element={<LoginPage />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
