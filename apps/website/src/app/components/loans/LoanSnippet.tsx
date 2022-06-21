import { LoanSimple } from '@api/io-model';
import { Card, Stack } from '@mui/material';
import { ReactNode } from 'react';
import { AppTypography } from '../common/AppTypography';
import { EmeraldDisplay } from '../common/emerald/EmeraldDisplay';

interface LoanFieldProps {
    title: string;
    children: ReactNode;
}
function LoanField(props: LoanFieldProps) {
    return (
        <Stack direction="row">
            <AppTypography>{props.title}</AppTypography>
            {props.children}
        </Stack>
    );
}
export interface LoanSnippetProps {
    loan: LoanSimple;
}
export function LoanSnippet(props: LoanSnippetProps) {
    return (
        <Card>
            <Stack direction="row">
                <LoanField title="Balanace">
                    <EmeraldDisplay
                        emeralds={props.loan.currentLoan}
                        length="normal"
                    />
                </LoanField>
            </Stack>
        </Card>
    );
}
