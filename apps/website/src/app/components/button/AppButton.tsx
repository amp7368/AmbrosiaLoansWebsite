import { Button, ButtonProps, Theme, Typography } from '@mui/material';
import { common } from '@mui/material/colors';
import { Variant } from '@mui/material/styles/createTypography';
import { AppTypography } from '../AppTypography';

export type AppButtonProps = ButtonProps & { textVariant?: Variant };
export function AppButton({
    children,
    textVariant = 'h6',
    ...props
}: AppButtonProps) {
    return (
        <Button {...props}>
            <AppTypography variant={textVariant}>{children}</AppTypography>
        </Button>
    );
}
