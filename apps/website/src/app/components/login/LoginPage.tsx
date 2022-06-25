import { LoginRequest, LoginResponse } from '@api/io-model';
import { ObservableTernary } from '@appleptr16/elemental';
import { Login } from '@mui/icons-material';
import { Divider, Stack } from '@mui/material';
import { Box } from '@mui/system';
import { ReactNode, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import {
    selfUserLogin,
    useIsLoggedIn,
} from '../../elf/self-user/SelfUser.repository';

import { navTo, urls } from '../../util/routes';
import { AppTypography } from '../common/AppTypography';
import { AppButton } from '../common/button/AppButton';
import { AppInput } from '../common/form/AppInput';
import { Page } from '../common/Page';

export function LoginForm() {
    const { handleSubmit, setValue, register } = useForm<LoginRequest>();
    const [errorElement, setErrorElement] = useState<ReactNode>();
    const onSubmit: SubmitHandler<LoginRequest> = async (data, event) => {
        event?.preventDefault();
        const response: LoginResponse = await selfUserLogin(data);
        if (!response.isOk) setErrorElement([response.message]);
        else setErrorElement(<Navigate to={urls.client} />);
    };
    const fillFields = () => {
        setValue('username', 'appleptr16');
        setValue('password', 'appleptr16');
    };
    const fieldElements = [
        <AppInput {...register('username')} placeholder="Username" />,
        <AppInput
            {...register('password')}
            type="password"
            placeholder="Password"
        />,
        <AppButton variant="contained" type="submit">
            Submit
        </AppButton>,
        <AppTypography>{errorElement}</AppTypography>,
        <AppButton variant="contained" onClick={fillFields}>
            Fill
        </AppButton>,
    ];
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack direction="column" divider={<Divider />} spacing={1}>
                {fieldElements.map((field, i) => (
                    <Box key={i}>{field}</Box>
                ))}
            </Stack>
        </form>
    );
}
export function LoginPage() {
    const isLoggedIn = useIsLoggedIn();
    if (isLoggedIn) navTo(urls.client);
    return (
        <Page title="Login">
            <LoginForm />
        </Page>
    );
}
