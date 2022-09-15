import { LoginRequest, LoginResponse } from '@api/io-model';
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
import { AppForm } from '../common/form/AppForm';
import { AppInput } from '../common/form/AppInput';
import { Page } from '../common/Page';

export function LoginPage() {
    const isLoggedIn = useIsLoggedIn();
    const { handleSubmit, setValue, register } = useForm<LoginRequest>();
    const [errorElement, setErrorElement] = useState<ReactNode>();
    if (isLoggedIn === undefined) return <>Loading</>;
    if (isLoggedIn) navTo(urls.client);
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
        <AppTypography>{errorElement}</AppTypography>,
    ];
    return (
        <Page title="Login" isPublic>
            <AppForm
                onSubmit={handleSubmit(onSubmit)}
                actions={[
                    <AppButton key="submit" variant="contained" type="submit">
                        Submit
                    </AppButton>,
                    <AppButton
                        key="fill"
                        variant="contained"
                        onClick={fillFields}
                    >
                        Fill
                    </AppButton>,
                ]}
            >
                {fieldElements.map((field, i) => (
                    <Box key={i}>{field}</Box>
                ))}
            </AppForm>
        </Page>
    );
}
