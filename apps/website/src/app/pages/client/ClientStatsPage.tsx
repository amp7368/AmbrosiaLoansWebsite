import { ClientSimple, InvestmentSimple, LoanSimple } from '@api/io-model';
import { Optional } from '@appleptr16/utilities';
import { Card, Link, Stack } from '@mui/material';
import { ReactNode } from 'react';

import { useClient } from '../../elf/client/Client.repository';
import { useClientInvestments } from '../../elf/investment/Investment.repository';
import { useClientLoans } from '../../elf/loan/Loan.repository';
import { setUI } from '../../elf/ui/UI.repository';
import { nav, navTo, urls } from '../../util/routes';
import { AppPaper } from '../../components/AppPaper';
import { AppTypography } from '../../components/AppTypography';
import { AppButton } from '../../components/button/AppButton';
import { EmeraldDisplay } from '../../components/emerald/EmeraldDisplay';
import { Page } from '../../components/Page';
import { createLoanPageUiId } from '../loans/CreateLoanPage';
import { ClientStatsActions } from './ClientStatsActions';
import { ClientStatsSection } from './ClientStatsSection';
import { ClientStatsUserInfo } from './ClientStatsUserInfo';

function LoanRow(loan: LoanSimple) {
    return (
        <Link underline="none" href={nav.loan.loanToURL(loan.uuid)}>
            <Card
                raised
                sx={{
                    padding: 2,
                    bgcolor: (theme) => theme.palette.common.black,
                }}
            >
                <AppTypography>Broker: {loan.broker}</AppTypography>
                <AppTypography>Rate: {loan.rate}</AppTypography>
                <EmeraldDisplay emeralds={loan.currentLoan} length="normal" />
            </Card>
        </Link>
    );
}
function InvestmentRow(investment: InvestmentSimple) {
    return <AppPaper>{JSON.stringify(investment)}</AppPaper>;
}

export function ClientStatsPage() {
    const clientUUID: string = nav.client.fromURL();
    const client: Optional<ClientSimple> = useClient(clientUUID);
    const loansElement: ReactNode = useClientLoans(client).map(LoanRow);
    const investElement: ReactNode =
        useClientInvestments(client).map(InvestmentRow);

    if (!client)
        return (
            <AppTypography>Could not find client '{clientUUID}'</AppTypography>
        );
    return (
        <Page title={client.displayName}>
            <Stack direction="row" width="100%" justifyContent="space-around">
                <ClientStatsActions client={client} />
                <ClientStatsUserInfo client={client} />
            </Stack>
            <Stack direction="row" width="100%" justifyContent="space-around">
                <AppPaper>
                    <ClientStatsSection
                        title="Loan"
                        actions={[
                            <AppButton
                                variant="contained"
                                onClick={() => {
                                    setUI(
                                        createLoanPageUiId,
                                        'client',
                                        client.uuid
                                    );
                                    navTo(urls.createLoan);
                                }}
                                key={1}
                            >
                                Create
                            </AppButton>,
                        ]}
                        content={loansElement}
                    />
                </AppPaper>
                <AppPaper>
                    <ClientStatsSection
                        title="Investment"
                        actions={[]}
                        content={investElement}
                    />
                </AppPaper>
            </Stack>
        </Page>
    );
}
