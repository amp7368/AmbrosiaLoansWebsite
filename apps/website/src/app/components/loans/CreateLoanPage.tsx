import { ClientSimple, LoanSimple } from '@api/io-model';
import { Optional } from '@appleptr16/utilities';
import { Stack } from '@mui/material';
import { ReactNode, useState } from 'react';

import { useClient, useClientLoans } from '../../akita/client/Client.query';
import { AppTypography } from '../common/AppTypography';
import { Page } from '../common/Page';
import { CreateLoanForm } from './CreateLoanForm';
import { LoanSnippet } from './LoanSnippet';

interface ClientInfoProps {
    client: string | undefined;
}
function ClientInfo(props: ClientInfoProps) {
    const client: Optional<ClientSimple> = useClient(props.client);
    const loans: Optional<LoanSimple[]> = useClientLoans(client);
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
export function CreateLoanPage() {
    const [client, setClient] = useState<string>();
    return (
        <Page title="Withdrawl">
            <Stack direction="row" justifyContent="center" spacing={3}>
                <CreateLoanForm setClient={setClient} />
                <ClientInfo client={client} />
            </Stack>
        </Page>
    );
}
