import { Typography, TypographyProps } from '@mui/material';

export type AppTypographyProps = TypographyProps;
export function AppTypography(props: AppTypographyProps) {
    return <Typography fontFamily="Roboto" {...props} />;
}
