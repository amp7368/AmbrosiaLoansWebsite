import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { createTheme, ThemeOptions } from '@mui/material';

export const defaultThemeOptions: ThemeOptions = {
    palette: {
        mode: 'dark',
        primary: {
            main: '#9817cc',
        },
        secondary: {
            main: '#cc17a5',
        },
        background: {
            default: '#131314',
            paper: '#3e17cc',
        },
        text: {
            primary: '#cc174a',
            secondary: '#66bb6a',
        },
    },
};
export const defaultTheme = createTheme(defaultThemeOptions);

const element = document.getElementById('root');
const color = defaultTheme.palette.background.default;
if (element != null) element.style.backgroundColor = color;
