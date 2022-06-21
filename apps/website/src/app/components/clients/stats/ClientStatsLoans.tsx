import { ClientSimple, LoanSimple } from '@api/io-model';
import { Optional } from '@appleptr16/utilities';
import { Box } from '@mui/material';
import { selfUserQuery } from '../../../akita/self-user/SelfUser.query';
import { selfUserStore } from '../../../akita/self-user/SelfUser.store';
import { urls } from '../../../util/routes';

import { AppTypography } from '../../common/AppTypography';
import { ClientStatsSection } from './ClientStatsSection';

const loadingElement = <AppTypography variant="h3">Loading!</AppTypography>;
function LoanRow(loan: LoanSimple) {
    return <Box>{JSON.stringify(loan)}</Box>;
}
export interface ClientStatsLoansProps {
    loans: Optional<LoanSimple[]>;
    client: ClientSimple;
}
export function ClientStatsLoans({ loans, client }: ClientStatsLoansProps) {
    const loansElement = loans ? loans.map(LoanRow) : loadingElement;
    return (
        <ClientStatsSection
            title="Loan"
            actions={[
                {
                    title: 'Create',
                    onClick: () => {
                        selfUserStore.setProp('currentClient', {
                            uuid: client.uuid,
                        });
                        window.location.href = urls.createLoan;
                    },
                },
            ]}
            content={loansElement}
        />
    );
}
