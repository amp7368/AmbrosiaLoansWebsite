import { Button, Link } from '@mui/material';
import { useState } from 'react';
export function App() {
    const [count, setCount] = useState<number>(0);
    return (
        <Button variant="contained" onClick={() => setCount(count + 1)}>
            Hello = {count}
        </Button>
    );
}
