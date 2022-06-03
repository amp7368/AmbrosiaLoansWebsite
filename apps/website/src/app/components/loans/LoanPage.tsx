import { Loan } from '@api/io-model';
import { useObservableList } from '@appleptr16/elemental';
import { Button, Stack, Typography } from '@mui/material';
import { map } from 'rxjs';
import { loanQuery } from '../../akita/loan/Loan.query';

import { routes } from '../../util/routes';

function LoanRow(Loan: Loan) {
    return (
        <>
            <Stack direction="row" key={Loan.uuid}>
                <Typography>{Loan.broker}</Typography>
                <Typography>{Loan.amountLoaned}</Typography>
            </Stack>
        </>
    );
}
export function LoansPage() {
    const Loans = loanQuery.loans
        .select()
        .pipe(map((state) => state.newState ?? []));

    const LoanProfile = useObservableList(
        Loans,
        (a, b) =>
            new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    );
    return (
        <>
            <Button
                variant="outlined"
                color="secondary"
                href={routes.createLoan}
            >
                +
            </Button>
            <Stack direction="column">{LoanProfile.map(LoanRow)}</Stack>
        </>
    );
}
