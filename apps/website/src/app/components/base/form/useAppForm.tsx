import { Divider, Input, InputProps, Stack } from '@mui/material';
import { useMemo, useState } from 'react';
import {
    ArrayPath,
    FieldPath,
    FieldPathValues,
    FormState,
    Path,
    SubmitHandler,
    useForm,
    UseFormHandleSubmit,
    UseFormRegister,
    UseFormReturn,
} from 'react-hook-form';
import { Traversable } from 'react-hook-form/dist/types/path/common';

export class AppFormField<FormState> {
    constructor(
        private key: Path<FormState>,
        private register: UseFormRegister<FormState>
    ) {
        this.text = this.text.bind(this);
    }
    text = (props: InputProps) => {
        const placeholder =
            props.placeholder == null ? this.key : props.placeholder;
        return (
            <Input
                {...this.register(this.key)}
                {...props}
                placeholder={placeholder}
            />
        );
    };
}
type AppFormFieldObj<FormState> = {
    [Key in FieldPath<FormState>]: AppFormField<FormState>;
};
export type UseAppFormReturn<FormState> = UseFormReturn<FormState> & {
    fields: AppFormFieldObj<FormState>;
};
export function useAppForm<FormState extends Traversable>(
    fieldKeys: FieldPath<FormState>[]
): UseAppFormReturn<FormState> {
    const form: UseFormReturn<FormState> = useForm<FormState>();

    const mapFieldKeys = (key: FieldPath<FormState>) => [
        key,
        new AppFormField<FormState>(key, form.register),
    ];
    const fields: AppFormFieldObj<FormState> = useMemo(
        () =>
            Object.fromEntries(
                fieldKeys.map(mapFieldKeys)
            ) as AppFormFieldObj<FormState>,
        [...fieldKeys]
    );
    return { fields, ...form };
}

export interface ExampleData {
    hello: string;
    how: string;
    you: string;
}
export function Example() {
    const { register, handleSubmit, setValue, fields } =
        useAppForm<ExampleData>(['hello']);
    const onSubmit: SubmitHandler<ExampleData> = (data, e) => {
        console.log('rawr');
        if (e) e.preventDefault();
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack direction="column" divider={<Divider />} spacing={1}>
                {<fields.hello.text />}
            </Stack>
        </form>
    );
}
