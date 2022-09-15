import { Stack } from '@mui/material';
import { title } from 'process';
import { useState } from 'react';
import { UseFormRegister, UseFormRegisterReturn } from 'react-hook-form';

import { LoanBuildRequest } from '../../../elf/loan/Loan.repository';
import {
    addCollateralUI,
    removeCollateralUI,
    useCollateralUI,
} from '../../../elf/ui/CollateralUI';
import { AppButton } from '../button/AppButton';
import { AppInput } from './AppInput';

interface CollateralInputProps {
    remove: () => void;
    comments: UseFormRegisterReturn;
    image: UseFormRegisterReturn;
}

function CollateralInput(props: CollateralInputProps) {
    return (
        <Stack direction="row" spacing={2} alignItems="center">
            <AppInput
                {...props.comments}
                multiline
                minRows={4}
                sx={{ padding: 0.5 }}
                title="Comments"
            />
            <Stack direction="column">
                <input
                    {...props.image}
                    type="file"
                    onChange={(e) => {
                        e.persist();
                        console.log('file', e.target.value); // you get all the files object here
                    }}
                />
                <AppButton onClick={props.remove}>Remove</AppButton>
            </Stack>
        </Stack>
    );
}
export interface CollateralListInputProps {
    uiId: string;
    register: UseFormRegister<LoanBuildRequest>;
}
export function CollateralListInput(props: CollateralListInputProps) {
    const ui = useCollateralUI(props.uiId);
    return (
        <Stack direction="column" spacing={2}>
            {ui.collateral.map((subProps, i) => (
                <CollateralInput
                    {...subProps}
                    key={i}
                    remove={() => removeCollateralUI(props.uiId, i)}
                    comments={props.register(
                        `collateral.${i}.comments` as 'collateral.0.comments'
                    )}
                    image={props.register(
                        `collateral.${i}.image` as 'collateral.0.image'
                    )}
                />
            ))}
            <AppButton onClick={() => addCollateralUI(props.uiId)}>
                Add Collateral [+]
            </AppButton>
        </Stack>
    );
}
