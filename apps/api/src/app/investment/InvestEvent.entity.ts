import { InvestEvent } from '@api/io-model';
import { CreateClassFactory } from '@appleptr16/utilities';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { CollateralEntity } from '../collateral/Collateral.entity';
import { emeraldType, EntityTables } from '../EntityTables';
import { InvestmentEntity } from './Investment.entity';

enum InvestEventType {
    Create,
    Withdrawl,
    Deposit,
    ZeroOut,
}
@Entity(EntityTables.InvestEvent)
export class InvestEventEntity implements InvestEvent {
    static create = new CreateClassFactory(InvestEvent).createFn();
    // metadata
    @PrimaryGeneratedColumn('uuid')
    uuid: string;
    @Column('timestamp')
    date: Date;

    // content
    @Column({ type: 'enum', enum: InvestEventType })
    eventType: string;
    @Column(emeraldType)
    emeraldChange: number;

    @JoinColumn()
    @OneToOne(() => CollateralEntity)
    collateral?: CollateralEntity;

    @ManyToOne(() => InvestmentEntity, (invest) => invest.history)
    investment: InvestmentEntity;
}
