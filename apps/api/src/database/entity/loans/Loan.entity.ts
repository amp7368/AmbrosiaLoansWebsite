import { Loan } from '@api/io-model';
import { CreateClassFactory } from '@appleptr16/utilities';
import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { ClientEntity } from '../client/Client.entity';
import { emeraldType, loanRateType } from '../EntityTypes';
import { LoanEventEntity } from './LoanEvent.entity';

@Entity('loan')
export class LoanEntity implements Loan {
    static create = new CreateClassFactory(LoanEntity).createFn();
    // meta
    @PrimaryGeneratedColumn('uuid')
    uuid: string;
    @ManyToOne(() => ClientEntity, (client) => client.investments)
    client: string;
    @Column({ type: 'varchar', length: 100 })
    broker: string;

    // content
    @Column(emeraldType)
    currentLoan: number;

    // history
    @OneToMany(() => LoanEventEntity, (event) => event.loan, { eager: true })
    history: LoanEventEntity[];

    @Column(loanRateType)
    rate: number;
}
