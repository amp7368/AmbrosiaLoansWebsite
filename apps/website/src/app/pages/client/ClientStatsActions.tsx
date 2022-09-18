import { ClientSimple } from '@api/io-model';
import { Optional } from '@appleptr16/utilities';
import { Button, Stack } from '@mui/material';
import { Variant } from '@mui/material/styles/createTypography';
import { setUI } from '../../elf/ui/UI.repository';
import { navTo, urls } from '../../util/routes';
import { AppTypography } from '../../components/AppTypography';
import { createLoanPageUiId } from '../loans/CreateLoanPage';

interface ClientActionProps {
    title: string;
    variant: Variant;
    onClick: () => void;
}
function ClientAction(props: ClientActionProps) {
    return (
        <Button variant="contained" color="primary" onClick={props.onClick}>
            <AppTypography variant={props.variant}>{props.title}</AppTypography>
        </Button>
    );
}
export interface ClientStatsActionsProps {
    client: ClientSimple;
}
export function ClientStatsActions(props: ClientStatsActionsProps) {
    return (
        <Stack spacing={3}>
            <Stack direction="row" spacing={3}>
                <ClientAction
                    variant="h4"
                    title="Deposit"
                    onClick={() => console.log('rawr')}
                />
                <ClientAction
                    variant="h4"
                    title="Withdraw"
                    onClick={() => {
                        setUI(createLoanPageUiId, 'client', props.client.uuid);
                        navTo(urls.createLoan);
                    }}
                />
            </Stack>
            <Stack direction="row" spacing={3}>
                <ClientAction
                    variant="h5"
                    title="Freeze"
                    onClick={() => console.log('rawr')}
                />
                <ClientAction
                    variant="h5"
                    title="Ban"
                    onClick={() => console.log('rawr')}
                />
            </Stack>
        </Stack>
    );
}
