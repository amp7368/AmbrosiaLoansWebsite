import 'reflect-metadata';
import './app/akita/client/Client.query';
import './app/akita/loan/Loan.query';

import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { StrictMode } from 'react';
import { render } from 'react-dom';

import { App } from './app/App';
import { defaultTheme } from './app/util/appTheme';
import { initAkita } from './appStorage';

initAkita();
render(
    <StrictMode>
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <App />
        </ThemeProvider>
    </StrictMode>,
    document.getElementById('root')
);
