import { LoanCreateRequest } from '@api/io-model';
import { Box, Button, Divider, Input, Stack } from '@mui/material';
import { ReactNode, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { clientQuery } from '../../akita/client/Client.query';
import { loanQuery } from '../../akita/loan/Loan.query';
import { AppTypography } from '../common/AppTypography';
import { AppInput } from '../common/form/AppInput';
import { ClientSelector } from '../common/form/ClientSelector';
import { CollateralSelector } from '../common/form/CollateralSelector';

export interface CreateLoanFormProps {
    setClient: (client: string) => void;
}
export function CreateLoanForm(props: CreateLoanFormProps) {
    const { handleSubmit, register } = useForm<LoanCreateRequest['loan']>();
    const [msgElement, setMsgElement] = useState<string[]>();
    const onSubmit: SubmitHandler<LoanCreateRequest['loan']> = async (
        loan,
        event
    ) => {
        event?.preventDefault();
        loan.client =
            clientQuery
                .getAll()
                .find((client) =>
                    client.displayName.matchAll(new RegExp(loan.client, 'ig'))
                )?.uuid ?? '';

        const response = await loanQuery.createLoan({ loan });
        if (!response.isOk) {
            setMsgElement([response.message]);
            return;
        }
    };
    const fieldElements = [
        <AppInput
            {...register('amountLoaned', {
                required: true,
                valueAsNumber: true,
            })}
            label="Amount Loaned"
            placeholder="33214"
        />,
        <AppInput
            {...register('broker', { required: true })}
            label="Broker"
            placeholder="Tealycraft"
        />,
        <ClientSelector
            renderInput={(params) => (
                <AppInput
                    {...params}
                    {...register('client', { required: true })}
                    inputProps={{ ...params.inputProps }}
                    placeholder="Client"
                />
            )}
            setClient={props.setClient}
        />,
        <CollateralSelector />,
        <AppInput {...register('rate')} placeholder={'Rate'} />,
    ];
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack
                direction="column"
                alignItems="center"
                divider={<Divider />}
                spacing={1}
            >
                {fieldElements.map((field, i) => (
                    <Box key={i} width="15rem">
                        {field}
                    </Box>
                ))}
                <Button variant="contained" type="submit">
                    Submit
                </Button>
            </Stack>
            <AppTypography>{msgElement}</AppTypography>
        </form>
    );
}
