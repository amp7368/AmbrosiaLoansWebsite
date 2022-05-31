import { ClientCreateRequest, LoginRequest } from '@api/io-model';
import { Button, Divider, Input, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { ReactNode, useState } from 'react';
import { SubmitHandler, useForm, UseFormReturn } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import { clientQuery } from '../../akita/client/Client.query';

import { selfUserQuery } from '../../akita/self-user/SelfUser.query';
import { routes } from '../../util/routes';
import { useAppForm, UseAppFormReturn } from '../base/form/useAppForm';

export function CreateClientPage() {
    const {
        handleSubmit,
        fields,
    }: UseAppFormReturn<ClientCreateRequest['client']> = useAppForm<
        ClientCreateRequest['client']
    >(['discordTag', 'displayName']);
    const [errorElement, setErrorElement] = useState<string[]>();
    const onSubmit: SubmitHandler<ClientCreateRequest['client']> = async (
        client,
        event
    ) => {
        event?.preventDefault();
        const response = await clientQuery.createClient({ client });
        if (!response.isOk) {
            setErrorElement([response.message]);
        }
    };
    const fieldElements = [
        <fields.discordTag.text />,
        <fields.displayName.text />,

        <Button variant="contained" type="submit">
            Submit
        </Button>,
        <Typography>{errorElement}</Typography>,
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
