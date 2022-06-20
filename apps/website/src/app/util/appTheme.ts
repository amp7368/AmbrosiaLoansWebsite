import { createTheme, ThemeOptions } from '@mui/material';

export const defaultThemeOptions: ThemeOptions = {
    palette: {
        mode: 'dark',
        primary: {
            main: '#2f115c',
            contrastText: '#f50057',
        },
        secondary: {
            main: '#f50057',
        },
        background: {
            default: '#131314',
            paper: '#666666',
        },
        text: {
            primary: '#f50057',
            secondary: '#ffffff',
        },
    },
};
export const defaultTheme = createTheme(defaultThemeOptions);

const element = document.getElementById('root');
const color = defaultTheme.palette.background.default;
if (element != null) element.style.backgroundColor = color;
