import { ColumnOptions } from 'typeorm';

export const emeraldType: ColumnOptions = {
    type: 'decimal',
    length: 5,
    precision: 2,
};
export const loanRateType: ColumnOptions = {
    type: 'real',
};
