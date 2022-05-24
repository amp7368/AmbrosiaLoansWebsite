import { ColumnOptions } from 'typeorm';

export const emeraldType: ColumnOptions = {
    type: 'decimal',
    scale: 2,
    precision: 2,
};
export const loanRateType: ColumnOptions = {
    type: 'real',
};
