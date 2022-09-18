import { Box, TextField, TextFieldProps, useTheme } from '@mui/material';
import { green } from '@mui/material/colors';
import { forwardRef } from 'react';

function AppInputBase(props: TextFieldProps, ref: any) {
    const theme = useTheme();
    return (
        <TextField
            variant="outlined"
            ref={ref}
            InputLabelProps={{
                sx: { color: theme.palette.secondary.main },
            }}
            color="primary"
            {...props}
            sx={{
                label: {
                    fontSize: 20,
                    '::before': { color: 'secondary.contastText' },
                },
                input: {
                    color: green[400],
                    '::placeholder': {
                        color: (theme) => theme.palette.text.secondary,
                    },
                    fontSize: 20,
                },
                ...props.sx,
            }}
        />
    );
}
export const AppInput = forwardRef(AppInputBase);
