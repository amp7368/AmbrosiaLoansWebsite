import { PropsJustChildren } from '@appleptr16/elemental';
import { Box, ThemeProvider, Typography } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { appTheme } from './util/themeManager';
import {
    AllPageIds,
    AllRoutes,
    PageId,
    PageWrapperProps,
} from './routes/routeProps';
import { useMemo } from 'react';

const Root = (props: PropsJustChildren) => (
    <ThemeProvider theme={appTheme}>
        <Box width="100vw" height="100vh" bgcolor="background.default">
            {props.children}
        </Box>
    </ThemeProvider>
);
function convertRoute(id: PageId) {
    return AllRoutes[id].page.createRoute();
}
function App(): JSX.Element {
    const routes = useMemo(() => AllPageIds.map(convertRoute), [AllPageIds]);
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
