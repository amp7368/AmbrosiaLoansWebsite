import { alpha, Opacity, Paper, PaperProps, Theme } from '@mui/material';

type Opaceness = 'highest' | 'higher' | 'high' | 'normal' | 'low' | 'lower';
const OpacenessMap: Record<Opaceness, number> = {
    highest: 1,
    higher: 0.8,
    high: 0.7,
    normal: 0.5,
    low: 0.2,
    lower: 0.1,
};
export function AppPaper(props: PaperProps & { opacity?: Opaceness | number }) {
    let opacity: number;
    if (typeof props.opacity === 'number') opacity = props.opacity;
    else opacity = OpacenessMap[props.opacity ?? 'normal'];
    return (
        <Paper
            {...props}
            sx={{
                bgcolor: (theme) => theme.palette.grey[500],
                border: 'solid',
                borderColor: (theme) => theme.palette.secondary.main,
                borderWidth: 2,
                padding: 2,
                boxShadow: (theme: Theme) =>
                    `0 0 12px 4px ${alpha(theme.palette.secondary.main, 0.2)}`,
                ...props.sx,
            }}
        />
    );
}
