import { CreateClassFactory } from '@appleptr16/utilities';
import { InvestEvent } from './InvestmentEvent';

export interface Investment {
    uuid: string;
    client: string;
    broker: string;

    currentInvestment: number;

    history: InvestEvent[];

    initialInvestment: number;
    startDate: Date;
}
export interface InvestmentSimple {
    uuid: string;
    client: string;
    broker: string;

    currentInvestment: number;

    history: string[];

    initialInvestment: number;
    startDate: Date;
}
