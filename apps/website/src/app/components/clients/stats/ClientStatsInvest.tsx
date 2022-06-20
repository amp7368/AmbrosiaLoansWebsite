import { InvestmentSimple, LoanSimple } from '@api/io-model';
import { Optional } from '@appleptr16/utilities';
import { Box } from '@mui/material';

export interface ClientStatsInvestProps {
    investments: Optional<InvestmentSimple[]>;
}
export function ClientStatsInvest({ investments }: ClientStatsInvestProps) {
    return <Box>{JSON.stringify(investments)}</Box>;
}
