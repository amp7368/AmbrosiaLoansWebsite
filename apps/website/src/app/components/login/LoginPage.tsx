import { LoginRequest } from '@api/io-model';
import { ObservableTernary, ObserveableToElement } from '@appleptr16/elemental';
import {
    Button,
    Container,
    Divider,
    FormControl,
    Input,
    Stack,
    Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import {
    SubmitHandler,
    useForm,
    UseFormHandleSubmit,
    UseFormReturn,
} from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import { selfUserQuery } from '../../akita/self-user/SelfUser.query';
import { routes } from '../../util/routes';

export function LoginForm() {
    const {
        formState,
        register,
        handleSubmit,
        setValue,
    }: UseFormReturn<LoginRequest> = useForm<LoginRequest>();
    const [errorElement, setErrorElement] = useState<string[]>();
    const login: SubmitHandler<LoginRequest> = async (data, event) => {
        event?.preventDefault();
        const response = await selfUserQuery.login(data);
        if (!response.isOk) {
            setErrorElement([response.message]);
        }
    };
    return (
        <form onSubmit={handleSubmit(login)}>
            <Stack direction="column" divider={<Divider />} spacing={1}>
                <Box>
                    <Input placeholder="username" {...register('username')} />
                </Box>
                <Box>
                    <Input
                        placeholder="password"
                        type="password"
                        {...register('password')}
                    />
                </Box>
                <Box>
                    <Button variant="contained" type="submit">
                        Submit
                    </Button>
                </Box>
                <Typography>{errorElement}</Typography>
                <Box>
                    <Button
                        variant="contained"
                        onClick={() => {
                            setValue('username', 'appleptr16');
                            setValue('password', 'appleptr16');
                        }}
                    >
                        Fill
                    </Button>
                </Box>
            </Stack>
        </form>
    );
}
export function LoginPage() {
    return (
        <>
            <ObservableTernary
                observable={selfUserQuery.isLoggedIn$}
                onTrue={() => <Navigate to={routes.client} />}
                onFalse={() => <LoginForm />}
            />
        </>
    );
}
