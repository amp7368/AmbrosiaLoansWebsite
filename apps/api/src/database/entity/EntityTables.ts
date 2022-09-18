import { ColumnOptions } from 'typeorm';

export const emeraldType: ColumnOptions = {
    type: 'decimal',
    scale: 6,
    precision: 16,
};
export const loanRateType: ColumnOptions = {
    type: 'real',
};
export enum EntityTables {
    Broker = 'broker',
    Client = 'client',
    Collateral = 'collateral',
    Investment = 'investment',
    InvestEvent = 'invest_event',
    Loan = 'loan',
    LoanEvent = 'loan_event',
}
