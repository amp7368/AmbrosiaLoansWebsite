import { LoanSimple } from '@api/io-model';
import { Optional } from '@appleptr16/utilities';
import { Box } from '@mui/material';

import { AppTypography } from '../../common/AppTypography';
import { ClientStatsSection } from './ClientStatsSection';

const loadingElement = <AppTypography variant="h3">Loading!</AppTypography>;
function LoanRow(loan: LoanSimple) {
    return <Box>{JSON.stringify(loan)}</Box>;
}
export interface ClientStatsLoansProps {
    loans: Optional<LoanSimple[]>;
}
export function ClientStatsLoans({ loans }: ClientStatsLoansProps) {
    const loansElement = loans ? loans.map(LoanRow) : loadingElement;
    return (
        <ClientStatsSection
            title="Loan"
            actions={[{ title: 'Create', onClick: () => console.log('click') }]}
            content={loansElement}
        />
    );
}
