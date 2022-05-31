import 'reflect-metadata';

import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { StrictMode } from 'react';
import { render } from 'react-dom';

import { App } from './app/App';
import { defaultTheme } from './app/util/appTheme';
import { initAkita } from './appStorage';

initAkita();
render(
    <>
        <CssBaseline />
        <StrictMode>
            <ThemeProvider theme={defaultTheme}>
                <App />
            </ThemeProvider>
        </StrictMode>
    </>,
    document.getElementById('root')
);
