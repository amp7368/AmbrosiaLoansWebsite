import { Investment } from '@api/io-model';
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
import { LoanEventEntity } from '../loans/LoanEvent.entity';
import { InvestEventEntity } from './InvestEvent.entity';

@Entity(EntityTables.Investment)
export class InvestmentEntity implements Investment {
    static create = new CreateClassFactory(InvestmentEntity).createFn();
    @PrimaryGeneratedColumn('uuid')
    uuid: string;
    @ManyToOne(() => ClientEntity, (client) => client.investments)
    client: string;
    @Column({ type: 'varchar', length: 100 })
    broker: string;

    @Column(emeraldType)
    currentInvestment: number;

    @OneToMany(() => InvestEventEntity, (event) => event.investment)
    history: InvestEventEntity[];

    @Column(emeraldType)
    initialInvestment: number;
    @Column('timestamp')
    startDate: Date;
}
