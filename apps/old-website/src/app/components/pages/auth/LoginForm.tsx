import { LoginRequest } from '@api/io-model';
import { Box, FormControl, Stack, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { sessionService } from '../../../model/session/Session.service';

import { AuthLoginButton } from './AuthLoginButton';

function onValidFormSubmit() {
    sessionService.login({ username: 'appleptr16', password: 'appleptr16' });
}
export function LoginForm() {
    const { register, handleSubmit } = useForm<LoginRequest>();
    return (
        <form>
            <Stack direction="column" alignContent="center">
                <Box>
                    <FormControl color="secondary">
                        <TextField
                            {...register('username')}
                            required={true}
                            autoFocus
                            inputMode="text"
                            focused
                            variant="filled"
                            placeholder="Username"
                        />
                    </FormControl>
                </Box>
                <Box>
                    <TextField
                        {...register('password')}
                        required={true}
                        inputMode="text"
                        type="password"
                        focused
                        variant="filled"
                        placeholder="Password"
                    />
                </Box>
                <Stack
                    direction="row"
                    justifyContent="space-evenly"
                    marginTop={4}
                >
                    <AuthLoginButton
                        text="Login"
                        onClick={handleSubmit(sessionService.login)}
                    />
                    <AuthLoginButton
                        text="Bypass"
                        onClick={handleSubmit(onValidFormSubmit)}
                    />
                </Stack>
            </Stack>
        </form>
    );
}
