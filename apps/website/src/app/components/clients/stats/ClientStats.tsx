import { ClientSimple, LoanSimple } from '@api/io-model';
import { useObservableMemo } from '@appleptr16/elemental';
import { Optional } from '@appleptr16/utilities';
import { Stack } from '@mui/material';
import { useClient } from '../../../elf/client/Client.repository';
import { useClientLoans } from '../../../elf/loan/Loan.repository';

import { nav, urls } from '../../../util/routes';
import { AppTypography } from '../../common/AppTypography';
import { Page } from '../../common/Page';
import { ClientStatsActions } from './ClientStatsActions';
import { ClientStatsInvest } from './ClientStatsInvest';
import { ClientStatsLoans } from './ClientStatsLoans';
import { ClientStatsUserInfo } from './ClientStatsUserInfo';

export function ClientStats() {
    const clientUUID = nav.client.fromURL();
    const client = useClient(clientUUID);
    const loans = useClientLoans(client);
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
