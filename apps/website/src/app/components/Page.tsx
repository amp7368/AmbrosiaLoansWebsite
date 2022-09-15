import { PropsJustChildren } from '@appleptr16/elemental';
import { Box, Stack } from '@mui/material';
import { ReactNode } from 'react';

import { useIsLoggedIn } from '../elf/self-user/SelfUser.repository';
import { navTo, urls } from '../util/routes';
import { AppTypography } from './AppTypography';
import { AppForm } from './form/AppForm';

type PageVariant = 'form' | 'base';
export interface PageProps {
    title: string;
    isPublic?: true;
    children: ReactNode;
    variant?: PageVariant;
}
const pages: Record<
    PageVariant,
    ({ children }: PropsJustChildren) => JSX.Element
> = {
    base: ({ children }) => <>{children}</>,
    form: ({ children }) => <>{children}</>,
};
export function Page({ variant = 'base', ...props }: PageProps) {
    if (!props.isPublic) {
        const isLoggedIn = useIsLoggedIn();
        if (isLoggedIn === undefined) return <>Loading</>;
        if (!isLoggedIn) navTo(urls.login);
    }
    const RenderPage = pages[variant];

    return (
        <Stack direction="column" alignItems="center">
            <AppTypography
                variant="h2"
                fontWeight={500}
                textTransform="capitalize"
            >
                {props.title}
            </AppTypography>
            <br />
            <RenderPage>{props.children}</RenderPage>
        </Stack>
    );
}
