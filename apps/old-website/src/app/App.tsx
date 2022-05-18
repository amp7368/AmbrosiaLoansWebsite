import { PropsJustChildren } from '@appleptr16/elemental';
import { Box, ThemeProvider } from '@mui/material';
import { ReactNode, useMemo } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { authAPI } from './api/auth/AuthApi';
import { sessionService } from './model/session/Session.service';

import { RouteInfo } from './routes/RouteInfo';
import { AllPageIds, AllRoutes, PageId } from './routes/routeProps';
import { appTheme } from './util/themeManager';

const Root = (props: PropsJustChildren) => (
    <ThemeProvider theme={appTheme}>
        <Box width="100vw" height="100vh" bgcolor="background.default">
            {props.children}
        </Box>
    </ThemeProvider>
);
function convertRoute(id: PageId): RouteInfo<number> {
    return AllRoutes[id].page.createRoute();
}
function App(): JSX.Element {
    const routes = useMemo(() => AllPageIds.map(convertRoute), [AllPageIds]);
    // sessionService.login({ password: 'appleptr16', username: 'appleptr16' });
    return (
        <Root>
            <BrowserRouter>
                <Routes>
                    {routes.map((route) => (
                        <Route {...route.renderRouteProps()} />
                    ))}
                </Routes>
            </BrowserRouter>
        </Root>
    );
}

export default App;
