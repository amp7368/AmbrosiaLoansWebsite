import { ClientSimple, LoanSimple } from '@api/io-model';
import { useObservableMemo } from '@appleptr16/elemental';
import { Optional } from '@appleptr16/utilities';
import { Stack } from '@mui/material';

import { clientQuery } from '../../../akita/client/Client.query';
import { loanQuery } from '../../../akita/loan/Loan.query';
import { nav, urls } from '../../../util/routes';
import { AppTypography } from '../../common/AppTypography';
import { Page } from '../../common/Page';
import { ClientStatsActions } from './ClientStatsActions';
import { ClientStatsInvest } from './ClientStatsInvest';
import { ClientStatsLoans } from './ClientStatsLoans';
import { ClientStatsUserInfo } from './ClientStatsUserInfo';

export function ClientStats() {
    const clientUUID = nav.client.fromURL();
    const client: Optional<ClientSimple> = useObservableMemo(
        () => clientQuery.selectEntity(clientUUID),
        [clientUUID],
        undefined
    );
    const loans: Optional<LoanSimple[]> = useObservableMemo(
        () => loanQuery.selectMany(client?.loans ?? []),
        [client?.loans],
        undefined
    );
    // const investments: Optional<LoanSimple[]> = useObservableMemo(
    //     () => investmentQuery.selectMany(client.investments),
    //     [client.investments],
    //     undefined
    // );
    if (!client) return <AppTypography>Loading</AppTypography>;
    return (
        <Page title={client.displayName}>
            <Stack direction="column" spacing={3}>
                <ClientStatsActions client={client} />
                <ClientStatsUserInfo client={client} />
                <Stack
                    direction="row"
                    justifyContent="stretch"
                    alignItems="stretch"
                >
                    <ClientStatsLoans client={client} loans={loans} />
                    <ClientStatsInvest investments={[]} />
                </Stack>
            </Stack>
        </Page>
    );
}
