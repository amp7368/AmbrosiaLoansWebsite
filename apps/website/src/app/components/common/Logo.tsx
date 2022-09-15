import { Box } from '@mui/material';

import img from '../../../assets/Logo.png';
import { urls } from '../../util/routes';

export function Logo() {
    return (
        <Box height="4rem" width="7.5rem">
            <a>
                <img
                    src={img}
                    alt="applept16 Logo"
                    height="200"
                    width="200"
                    style={{
                        backgroundColor: 'black',
                        position: 'absolute',
                        maxHeight: '7.5rem',
                        maxWidth: '7.5rem',
                        borderRadius: '50%',
                    }}
                />
            </a>
        </Box>
    );
}
