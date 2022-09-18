import { ClientCreateRequest } from '@api/io-model';
import { Button, Divider, Stack } from '@mui/material';
import { Box } from '@mui/system';
import { ReactNode, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { createClient } from '../../elf/client/Client.repository';
import { navTo, urls } from '../../util/routes';

import { AppTypography } from '../../components/AppTypography';
import { AppButton } from '../../components/button/AppButton';
import { AppForm } from '../../components/form/AppForm';
import { AppInput } from '../../components/form/AppInput';
import { Page } from '../../components/Page';

export function CreateClientPage() {
    const { handleSubmit, register } = useForm<ClientCreateRequest['client']>();
    const [errorElement, setErrorElement] = useState<string[]>();
    const onSubmit: SubmitHandler<ClientCreateRequest['client']> = async (
        client,
        event
    ) => {
        event?.preventDefault();
        const response = await createClient({ client });
        if (!response.isOk) {
            setErrorElement([response.message]);
        } else {
            navTo(urls.client);
        }
    };
    const fieldElements = [
        <AppInput {...register('discordTag')} label="Discord Tag" />,
        <AppInput {...register('displayName')} label="Name" />,
        <AppTypography>{errorElement}</AppTypography>,
    ];
    return (
        <Page title="Create Client" variant="form">
            <AppForm
                onSubmit={handleSubmit(onSubmit)}
                actions={
                    <AppButton variant="contained" type="submit">
                        Submit
                    </AppButton>
                }
            >
                {fieldElements.map((field, i) => (
                    <Box key={i}>{field}</Box>
                ))}
            </AppForm>
        </Page>
    );
}
