import { Button, Stack } from '@mui/material';
import { memo, ReactNode } from 'react';
import { AppPaper } from '../../common/AppPaper';
import { AppTypography } from '../../common/AppTypography';

export interface ClientStatsActionProps {
    title: string;
    onClick: () => void;
}
export interface ClientStatsSectionProps {
    title: string;
    actions: ClientStatsActionProps[];
    content: ReactNode;
}
function ClientStatsSectionBase(props: ClientStatsSectionProps) {
    const actionElements = props.actions.map((action) => (
        <Button variant="contained" onClick={action.onClick} key={action.title}>
            {action.title}
        </Button>
    ));
    return (
        <AppPaper>
            <Stack padding={3} spacing={1} direction="column">
                <AppTypography variant="h4" color="text.secondary">
                    {props.title}
                </AppTypography>
                <Stack direction="row" spacing={2}>
                    {actionElements}
                </Stack>
                <AppPaper>{props.content}</AppPaper>
            </Stack>
        </AppPaper>
    );
}
export const ClientStatsSection = memo(ClientStatsSectionBase, (prev, next) => {
    if (prev.title !== next.title) return false;
    const len = prev.actions.length;
    if (next.actions.length !== len) return false;
    for (let i = 0; i < len; i++)
        if (prev.actions[i] !== next.actions[i]) return false;
    return prev.content === next.content;
});
