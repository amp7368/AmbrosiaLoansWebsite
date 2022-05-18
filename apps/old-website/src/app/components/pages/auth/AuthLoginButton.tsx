import { Button, ButtonProps, Typography } from '@mui/material';
export type AuthLoginButtonProps = ButtonProps & {
    text: string;
};

export function AuthLoginButton(props: AuthLoginButtonProps) {
    return (
        <Button variant="contained" color="secondary" {...props}>
            <Typography fontSize="2rem">{props.text}</Typography>
        </Button>
    );
}
