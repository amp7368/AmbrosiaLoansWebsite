import { Investment } from '../invest/Investment';
import { Loan } from '../loan';

export interface Client {
    uuid: string;
    displayName: string;

    // minecraft
    mcId: string;
    mcName: string;

    // discord
    discordId: number;
    discordTag: string;

    loans: Loan[];
    investments: Investment[];
}
export interface ClientSimple {
    uuid: string;
    displayName: string;

    // minecraft
    mcId?: string;
    mcName?: string;

    // discord
    discordId?: number;
    discordTag?: string;

    loans: string[];
    investments: string[];
}
