import { Box, Stack } from '@mui/material';
import { ReactNode, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { createLoan, LoanBuildRequest } from '../../elf/loan/Loan.repository';
import { useBroker } from '../../elf/self-user/SelfUser.repository';
import { getUIClient } from '../../elf/ui/UI.repository';
import { AppTypography } from '../common/AppTypography';
import { AppButton } from '../common/button/AppButton';
import { AppInput } from '../common/form/AppInput';
import { ClientSelector } from '../common/form/ClientSelector';
import { CollateralListInput } from '../common/form/CollateralListInput';

export interface CreateLoanFormProps {
    uiId: string;
}
export function CreateLoanForm(props: CreateLoanFormProps) {
    const broker = useBroker();
    const { handleSubmit, register, setValue } = useForm<LoanBuildRequest>({
        defaultValues: { broker: broker?.displayName ?? '', date: new Date() },
    });
    const [msgElement, setMsgElement] = useState<string[]>();
    const onSubmit: SubmitHandler<LoanBuildRequest> = async (
        loan: LoanBuildRequest,
        event
    ) => {
        event?.preventDefault();
        const clientUUID = getUIClient(props.uiId);
        if (clientUUID === undefined) {
            setMsgElement(['Client not specified']);
            return;
        }
        loan.client = clientUUID;
        const response = await createLoan(loan);
        if (!response.isOk) {
            setMsgElement([response.message]);
            return;
        }
    };
    const fillValues = () => {
        setValue('amountLoaned', 32165);
        setValue('rate', 2.35);
        setValue('collateral', [{ comments: 'Hello good deal' }]);
        setValue('broker', 'Tealycraft');
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
    ];
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack direction="column">
                <Stack direction="row" spacing={2}>
                    <Stack direction="column" alignItems="center" spacing={2}>
                        {fieldElements.map((field, i) => (
                            <Box key={i} width="15rem">
                                {field}
                            </Box>
                        ))}
                        <AppTypography>{msgElement}</AppTypography>
                    </Stack>
                    <Stack direction="column" alignItems="center" spacing={2}>
                        <CollateralListInput
                            register={register}
                            uiId={props.uiId}
                        />
                    </Stack>
                </Stack>
                <Stack direction="row" justifyContent="center">
                    <AppButton
                        variant="contained"
                        color="secondary"
                        type="submit"
                    >
                        Submit
                    </AppButton>
                    <AppButton
                        variant="contained"
                        color="secondary"
                        onClick={fillValues}
                    >
                        Fill
                    </AppButton>
                </Stack>
            </Stack>
        </form>
    );
}
