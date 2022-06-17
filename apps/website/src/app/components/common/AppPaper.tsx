import { alpha, Opacity, Paper, PaperProps, Theme } from '@mui/material';

type Opaceness = 'highest' | 'higher' | 'high' | 'normal' | 'low' | 'lower';
export function AppPaper(props: PaperProps & { opacity?: Opaceness | number }) {
    let opacity: number;
    if (typeof props.opacity === 'number') opacity = props.opacity;
    else {
        switch (props.opacity) {
            case 'highest':
                opacity = 1;
                break;
            case 'higher':
                opacity = 0.8;
                break;
            case 'high':
                opacity = 0.7;
                break;
            case 'normal':
                opacity = 0.5;
                break;
            case 'lower':
                opacity = 0.1;
                break;
            case 'low':
            default:
                opacity = 0.2;
                break;
        }
    }
    return (
        <Paper
            {...props}
            sx={{
                ...props.sx,
                bgcolor: (theme: Theme) =>
                    alpha(theme.palette.background.paper, opacity),

                boxShadow: (theme: Theme) =>
                    `0 0 12px 4px ${alpha(theme.palette.primary.main, 0.2)}`,
            }}
        />
    );
}
