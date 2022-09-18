import { Loan, LoanEvent } from '@api/io-model';
import { CreateClassFactory } from '@appleptr16/utilities';
import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { ClientEntity } from '../client/Client.entity';
import { EntityTables } from '../EntityTables';
import { emeraldType, loanRateType } from '../EntityTables';
import { LoanEventEntity } from './LoanEvent.entity';

@Entity(EntityTables.Loan)
export class LoanEntity implements Loan {
    static create = new CreateClassFactory(LoanEntity).createFn();
    // meta
    @PrimaryGeneratedColumn('uuid')
    uuid: string;
    @ManyToOne(() => ClientEntity, (client) => client.loans)
    client: string;
    @Column({ type: 'varchar', length: 100 })
    broker: string;

    // content
    @Column(emeraldType)
    currentLoan: number;

    // history
    @ManyToOne(() => LoanEventEntity, (event: LoanEventEntity) => event.loan)
    history: LoanEventEntity[];

    @Column(loanRateType)
    rate: number;
}
