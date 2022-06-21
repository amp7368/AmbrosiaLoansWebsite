import { TextField, TextFieldProps, useTheme } from '@mui/material';
import { green } from '@mui/material/colors';
import { forwardRef } from 'react';

function AppInputBase(props: TextFieldProps, ref: any) {
    const theme = useTheme();
    return (
        <TextField
            {...props}
            ref={ref}
            InputLabelProps={{
                sx: { color: theme.palette.secondary.main },
            }}
            sx={{
                label: {
                    fontSize: 20,
                    '::before': {
                        color: 'secondary.contastText',
                    },
                },

                input: {
                    color: green[400],
                    '::placeholder': { color: 'secondary.contrastText' },
                    fontSize: 20,
                },
                ...props.sx,
            }}
        />
    );
}
export const AppInput = forwardRef(AppInputBase);
