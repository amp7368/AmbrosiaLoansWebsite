import { ClientSimple, LoanSimple } from '@api/io-model';
import { Optional } from '@appleptr16/utilities';
import { Stack } from '@mui/material';
import { ReactNode, useState } from 'react';

import { useClientLoans } from '../../elf/loan/Loan.repository';
import { useUIClient } from '../../elf/ui/UI.repository';
import { AppTypography } from '../common/AppTypography';
import { Page } from '../common/Page';
import { CreateLoanForm } from './CreateLoanForm';
import { LoanSnippet } from './LoanSnippet';

interface ClientInfoProps {
    uiId: string;
}
function ClientInfo(props: ClientInfoProps) {
    const client: Optional<ClientSimple> = useUIClient(props.uiId);
    const loans: Optional<LoanSimple[]> = useClientLoans(client);
    console.log(client);
    let statsElement = null;
    if (client && loans) {
        statsElement = (
            <Stack direction="column">
                {loans.map((loan) => (
                    <LoanSnippet loan={loan} />
                ))}
            </Stack>
        );
    }
    return (
        <Stack direction="column">
            <AppTypography variant="h4">Client Stats</AppTypography>
            <AppTypography variant="h5">
                {client?.displayName ?? 'No client was found'}
            </AppTypography>
            {statsElement}
        </Stack>
    );
}
export const createLoanPageUiId = 'CreateLoanPage';
export function CreateLoanPage() {
    return (
        <Page title="Withdrawl" variant="form">
            <Stack direction="row" justifyContent="center" spacing={3}>
                <CreateLoanForm uiId={createLoanPageUiId} />
                <ClientInfo uiId={createLoanPageUiId} />
            </Stack>
        </Page>
    );
}
