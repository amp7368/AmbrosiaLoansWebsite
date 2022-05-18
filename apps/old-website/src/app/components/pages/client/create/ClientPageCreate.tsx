import { ClientCreateRequest } from '@api/io-model';
import { FormControl, FormLabel, TextField } from '@mui/material';
import { useState } from 'react';
import { useForm, UseFormRegisterReturn } from 'react-hook-form';

type ClientCreateData = Omit<ClientCreateRequest['client'], 'sessionToken'>;
interface SimpleFormInputProps {
    register: UseFormRegisterReturn;
    label: string;
}
function SimpleFormInput(props: SimpleFormInputProps) {
    const label = <FormLabel>{props.label}</FormLabel>;
    return (
        <FormControl {...props.register} variant="filled">
            <TextField label={label}>Text</TextField>
        </FormControl>
    );
}
export function ClientPageCreate() {
    const { register, handleSubmit } = useForm<ClientCreateData>();
    return (
        <form>
            <SimpleFormInput
                label="credit"
                register={register('credit')}
            ></SimpleFormInput>
        </form>
    );
}
