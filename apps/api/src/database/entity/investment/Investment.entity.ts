import { CreateClassFactory } from '@appleptr16/utilities';
import { Investment } from 'libs/api-iomodel/src/api/investment/Investment';
import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { ClientEntity } from '../client/Client.entity';
import { emeraldType, loanRateType } from '../EntityTypes';
import { LoanEventEntity } from '../loans/LoanEvent.entity';
import { InvestEventEntity } from './InvestEvent.entity';

@Entity('investment')
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

    @OneToMany(() => LoanEventEntity, (event) => event.uuid)
    history: InvestEventEntity[];

    @Column(emeraldType)
    initialInvestment: number;
    @Column('timestamp')
    startDate: Date;
}
