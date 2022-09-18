import { Breadcrumbs, Container, Divider, Stack } from '@mui/material';
import { useBreadcrumbs } from '../elf/self-user/SelfUser.repository';
import { AppTypography } from './AppTypography';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export function AppBreadcrumbs() {
    let breadcrumbs = useBreadcrumbs();
    return (
        <Stack alignItems="center">
            <Breadcrumbs separator={<ArrowForwardIosIcon color="primary" />}>
                {breadcrumbs.map((crumb) => (
                    <a href={crumb}>
                        <AppTypography color="secondary" variant="h4">
                            {crumb}
                        </AppTypography>
                    </a>
                ))}
            </Breadcrumbs>
        </Stack>
    );
}
