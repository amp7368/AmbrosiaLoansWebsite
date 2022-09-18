import { LoginRequest, LoginResponse } from '@api/io-model';
import { Box } from '@mui/system';
import { ReactNode, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { AppTypography } from '../../components/AppTypography';
import { AppButton } from '../../components/button/AppButton';
import { AppForm } from '../../components/form/AppForm';
import { AppInput } from '../../components/form/AppInput';
import { Page } from '../../components/Page';
import {
    selfUserLogin,
    useIsLoggedIn,
} from '../../elf/self-user/SelfUser.repository';

export function LoginPage() {
    const { handleSubmit, setValue, register } = useForm<LoginRequest>();
    const [errorElement, setErrorElement] = useState<ReactNode>();
    const onSubmit: SubmitHandler<LoginRequest> = async (data, event) => {
        event?.preventDefault();
        const response: LoginResponse = await selfUserLogin(data);
        if (!response.isOk) setErrorElement([response.message]);
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
