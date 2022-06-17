import { Button } from '@mui/material';
import { clearAppStorage } from 'apps/website/src/appStorage';

export function OverviewPage() {
    return (
        <Button variant="contained" onClick={clearAppStorage}>
            Clear Stores
        </Button>
    );
}
