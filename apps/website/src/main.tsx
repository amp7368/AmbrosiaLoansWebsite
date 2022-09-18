import 'reflect-metadata';

import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { StrictMode } from 'react';
import { render } from 'react-dom';

import { App } from './app/App';
import { defaultTheme } from './app/util/appTheme';
import { enableElfProdMode } from '@ngneat/elf';
import { AppHeader } from './app/components/AppHeader';
import { AppBreadcrumbs } from './app/components/AppBreadcrumbs';
import { RouteRules } from './RouteRules';

render(
    <StrictMode>
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <AppHeader />
            <AppBreadcrumbs />
            <App />
            <RouteRules />
        </ThemeProvider>
    </StrictMode>,
    document.getElementById('root')
);
if (false) {
    enableElfProdMode();
}
