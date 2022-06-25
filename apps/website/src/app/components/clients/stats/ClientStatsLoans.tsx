import { ClientSimple, LoanSimple } from '@api/io-model';
import { Optional } from '@appleptr16/utilities';
import { Box } from '@mui/material';
import { ReactNode } from 'react';
import { setUI } from '../../../elf/ui/UI.repository';
import { navTo, urls } from '../../../util/routes';

import { AppTypography } from '../../common/AppTypography';
import { CreateLoanPageUI } from '../../loans/CreateLoanPage';
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
    const loansElement: ReactNode = loans ? loans.map(LoanRow) : loadingElement;
    return (
        <ClientStatsSection
            title="Loan"
            actions={[
                {
                    title: 'Create',
                    onClick: () => {
                        setUI(CreateLoanPageUI, 'client', client.uuid);
                        navTo(urls.createLoan);
                    },
                },
            ]}
            content={loansElement}
        />
    );
}
