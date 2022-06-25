import { LoanCreateRequest } from '@api/io-model';
import { Box, Button, Divider, Input, Stack } from '@mui/material';
import { ReactNode, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useClient } from '../../elf/client/Client.repository';
import { createLoan } from '../../elf/loan/Loan.repository';

import { AppTypography } from '../common/AppTypography';
import { AppInput } from '../common/form/AppInput';
import { ClientSelector } from '../common/form/ClientSelector';
import { CollateralListInput } from '../common/form/CollateralListInput';

export interface CreateLoanFormProps {
    uiId: string;
}
export function CreateLoanForm(props: CreateLoanFormProps) {
    const { handleSubmit, register } = useForm<LoanCreateRequest['loan']>();
    const [msgElement, setMsgElement] = useState<string[]>();
    const onSubmit: SubmitHandler<LoanCreateRequest['loan']> = async (
        loan,
        event
    ) => {
        event?.preventDefault();
        loan.client = useClient(loan.client)?.uuid ?? '';
        const response = await createLoan({ loan });
        if (!response.isOk) {
            setMsgElement([response.message]);
            return;
        }
    };
    const fieldElements = [
        <ClientSelector
            renderInput={(params) => (
                <AppInput
                    {...params}
                    {...register('client', { required: true })}
                    inputProps={{ ...params.inputProps }}
                    placeholder="user"
                    label="Client"
                />
            )}
            uiId={props.uiId}
        />,
        <AppInput
            {...register('amountLoaned', {
                required: true,
                valueAsNumber: true,
            })}
            label="Amount Loaned"
            placeholder="33214"
        />,
        <AppInput
            {...register('rate', {
                required: true,
                valueAsNumber: true,
            })}
            placeholder="Rate"
            label="Rate"
        />,
        <CollateralListInput />,
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
