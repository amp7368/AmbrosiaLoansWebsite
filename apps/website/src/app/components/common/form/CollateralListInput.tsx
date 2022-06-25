import { Collateral } from '@api/io-model';
import { Stack } from '@mui/material';
import { useState } from 'react';

import { AppButton } from '../button/AppButton';
import { AppInput } from './AppInput';

interface CollateralInputProps {
    remove: () => void;
    key: number;
    img?: Buffer;
    comments: string;
}
interface CollateralInputState {
    img?: Buffer;
    comments: string;
}
function CollateralInput(props: CollateralInputProps) {
    return (
        <Stack direction="row">
            <AppInput />
            <AppButton>Remove</AppButton>
        </Stack>
    );
}
export function CollateralListInput() {
    const [state, setState] = useState<CollateralInputState[]>([]);
    return (
        <Stack direction="column">
            <Stack direction="column">
                {state.map((props, i) => (
                    <CollateralInput
                        {...props}
                        key={i}
                        remove={() => setState([...state].splice(i, 1))}
                    />
                ))}
            </Stack>
            <AppButton onClick={() => setState([...state, { comments: '' }])}>
                Add [+]
            </AppButton>
        </Stack>
    );
}
