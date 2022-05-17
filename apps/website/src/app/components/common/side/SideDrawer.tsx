import { ArrowLeft, ArrowRight } from '@mui/icons-material';
import { Box, Button, Stack, styled, Theme, useTheme } from '@mui/material';
import { ReactNode, useState } from 'react';

import { TabEntry, TabEntryKey } from '../../../routes/routeProps';
import {
    sideDrawerCloseButton,
    SideDrawerNavDefProps,
    SideDrawerNavList,
    sideDrawerOpenButton,
} from './SideDrawerNav';
import { SideDrawerState } from './SideDrawerState';

const commonMixin = (theme: Theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundColor: theme.palette.primary.dark,
    border: 0,
    overflow: 'hidden',
    height: '100%',
});
interface CreateMixinStylingProps {
    width: string;
}
export function createMixinStyling(
    props: CreateMixinStylingProps
): (theme: Theme) => any {
    return () => ({
        width: props.width,
    });
}
interface StatedConsts {
    styling: (theme: Theme) => any;
}

const statedMixin: Record<SideDrawerState, StatedConsts> = {
    [SideDrawerState.CLOSED]: {
        styling: createMixinStyling({ width: '4rem' }),
    },
    [SideDrawerState.OPEN]: {
        styling: createMixinStyling({ width: '16rem' }),
    },
    [SideDrawerState.MORE_OPEN]: {
        styling: createMixinStyling({ width: '32rem' }),
    },
    [SideDrawerState.EXPANDED]: {
        styling: createMixinStyling({ width: '48rem' }),
    },
};
interface StyledDrawerProps {
    $currentState: SideDrawerState;
}
const StyledDrawer = styled(Box)<StyledDrawerProps>(
    ({ theme, $currentState: state }) => {
        const styling = {
            ...commonMixin(theme),
            ...statedMixin[state].styling(theme),
        };
        return {
            ...styling,
            '& .MuiDrawer-paper': {
                ...styling,
            },
        };
    }
);
interface TabButtonProps {
    isActive: boolean;
    tab: TabEntry;
    setTab: (tab: TabEntryKey) => void;
}
function TabButton(props: TabButtonProps) {
    const color = useTheme().palette.secondary;
    return (
        <Button
            variant="contained"
            sx={{
                fontWeight: 'bolder',
                backgroundColor: props.isActive ? color.light : color.dark,
                borderRadius: 0,
                boxShadow: 'none',
            }}
            onClick={() => props.setTab(props.tab.key())}
        >
            {props.isActive && <ArrowRight />}
            {props.tab.str}
            {props.isActive && <ArrowLeft />}
        </Button>
    );
}
export interface SideDrawerProps {
    defaultState?: SideDrawerState;
    drawerStates: Map<SideDrawerState, ReactNode>;
    tabs: TabEntry[];
    currentTab: TabEntry;
    setTab: (tab: TabEntryKey) => void;
}
export function SideDrawer({
    defaultState = SideDrawerState.OPEN,
    drawerStates,
    tabs = [],
    setTab,
    currentTab,
}: SideDrawerProps) {
    const [state, setState] = useState(defaultState);

    const allStates: SideDrawerState[] = (
        Object.values(SideDrawerState) as SideDrawerState[]
    ).filter((st: SideDrawerState) => drawerStates.has(st));
    const indexOfState: number = allStates.indexOf(state);

    const sizeButtons: SideDrawerNavDefProps[] = [];
    const navButtons = tabs.map((tab: TabEntry) => (
        <TabButton
            key={tab.num}
            isActive={tab === currentTab}
            setTab={setTab}
            tab={tab}
        />
    ));
    if (indexOfState > 0) sizeButtons.push(sideDrawerCloseButton);
    if (indexOfState < allStates.length - 1)
        sizeButtons.push(sideDrawerOpenButton);
    return (
        <StyledDrawer $currentState={state}>
            <SideDrawerNavList
                currentState={state}
                setState={setState}
                buttons={sizeButtons}
            />
            <Box padding="1rem .5rem 1rem .5rem" bgcolor="secondary.dark">
                <Stack direction="column" alignContent="center">
                    {navButtons}
                </Stack>
            </Box>
            {drawerStates.get(state)}
        </StyledDrawer>
    );
}
