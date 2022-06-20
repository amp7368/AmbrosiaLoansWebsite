import { Typography, TypographyProps } from '@mui/material';

export type AppTypographyProps = TypographyProps;
export function AppTypography({ children, ...props }: AppTypographyProps) {
    return (
        <Typography fontFamily="Roboto" {...props}>
            {children}
        </Typography>
    );
}
