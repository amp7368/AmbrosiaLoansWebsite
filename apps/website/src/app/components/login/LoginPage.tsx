import { ClientCreateRequest, LoginRequest } from '@api/io-model';
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
import { ReactNode, useState } from 'react';
import {
    SubmitHandler,
    useForm,
    UseFormHandleSubmit,
    UseFormReturn,
} from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import { selfUserQuery } from '../../akita/self-user/SelfUser.query';
import { routes } from '../../util/routes';
import { useAppForm, UseAppFormReturn } from '../common/form/useAppForm';

export function LoginForm() {
    const { handleSubmit, setValue, fields }: UseAppFormReturn<LoginRequest> =
        useAppForm<LoginRequest>(['username', 'password']);
    const [errorElement, setErrorElement] = useState<ReactNode>();
    const onSubmit: SubmitHandler<LoginRequest> = async (data, event) => {
        event?.preventDefault();
        const response = await selfUserQuery.login(data);
        if (!response.isOk) setErrorElement([response.message]);
        else setErrorElement(<Navigate to={routes.client} />);
    };
    const fillFields = () => {
        setValue('username', 'appleptr16');
        setValue('password', 'appleptr16');
    };
    const fieldElements = [
        <fields.username.text />,
        <fields.password.text type="password" />,
        <Button variant="contained" type="submit">
            Submit
        </Button>,
        <Typography>{errorElement}</Typography>,
        <Button variant="contained" onClick={fillFields}>
            Fill
        </Button>,
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
