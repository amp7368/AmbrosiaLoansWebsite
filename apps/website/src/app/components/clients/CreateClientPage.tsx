import { ClientCreateRequest } from '@api/io-model';
import { Button, Divider, Stack,  } from '@mui/material';
import { Box } from '@mui/system';
import { ReactNode, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';

import { clientQuery } from '../../akita/client/Client.query';
import { AppTypography } from '../common/AppTypography';
import { useAppForm, UseAppFormReturn } from '../common/form/useAppForm';

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
        <AppTypography>{errorElement}</AppTypography>,
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
