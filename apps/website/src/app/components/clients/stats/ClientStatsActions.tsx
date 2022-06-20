import { ClientSimple } from '@api/io-model';
import { Optional } from '@appleptr16/utilities';
import { Button, Stack } from '@mui/material';
import { AppTypography } from '../../common/AppTypography';

interface ClientActionProps {
    title: string;
    onClick: () => void;
}
function ClientAction(props: ClientActionProps) {
    return (
        <Button variant="contained" color="primary" onClick={props.onClick}>
            <AppTypography variant="h3">{props.title}</AppTypography>
        </Button>
    );
}
export interface ClientStatsActionsProps {
    client: Optional<ClientSimple>;
}
export function ClientStatsActions(props: ClientStatsActionsProps) {
    return (
        <Stack direction="row" justifyContent="space-between">
            <ClientAction title="Deposit" onClick={() => console.log('rawr')} />
            <ClientAction title="Loan" onClick={() => console.log('rawr')} />
            <ClientAction title="Freeze" onClick={() => console.log('rawr')} />
            <ClientAction title="Ban" onClick={() => console.log('rawr')} />
        </Stack>
    );
}
