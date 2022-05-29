import { ColumnOptions } from 'typeorm';

export const emeraldType: ColumnOptions = {
    type: 'decimal',
    scale: 6,
    precision: 16,
};
export const loanRateType: ColumnOptions = {
    type: 'real',
};
