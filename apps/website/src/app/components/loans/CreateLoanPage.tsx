import { LoanCreateRequest } from '@api/io-model';
import { Button, Divider, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { ReactNode, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';

import { loanQuery } from '../../akita/loan/Loan.query';
import { useAppForm, UseAppFormReturn } from '../base/form/useAppForm';

export function CreateLoanPage() {
    const {
        handleSubmit,
        fields,
    }: UseAppFormReturn<LoanCreateRequest['loan']> = useAppForm<
        LoanCreateRequest['loan']
    >(['amountLoaned', 'broker', 'client', 'rate']);
    const [errorElement, setErrorElement] = useState<string[]>();
    const onSubmit: SubmitHandler<LoanCreateRequest['loan']> = async (
        loan,
        event
    ) => {
        event?.preventDefault();
        const response = await loanQuery.createLoan({ loan });
        if (!response.isOk) {
            setErrorElement([response.message]);
        }
    };
    const fieldElements = [
        <fields.amountLoaned.text />,
        <fields.broker.text />,
        <fields.client.text />,
        <fields.rate.text />,

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
