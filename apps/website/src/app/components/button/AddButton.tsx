import AddCircleRounded from '@mui/icons-material/AddCircleRounded';
import { Button, ButtonProps, Stack } from '@mui/material';
import { AppTypography } from '.Typography';

export function AddButton({ children = 'New', ...props }: ButtonProps) {
    return (
        <Button variant="contained" color="primary" {...props}>
            <Stack direction="row" alignItems="center" spacing={1}>
                <AddCircleRounded />
                <AppTypography variant="h6">{children}</AppTypography>
            </Stack>
        </Button>
    );
}
