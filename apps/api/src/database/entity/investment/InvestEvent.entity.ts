import { InvestEvent } from '@api/io-model';
import { CreateClassFactory } from '@appleptr16/utilities';
import {
    Column,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { CollateralEntity } from '../collateral/entity/Collateral.entity';
import { emeraldType } from '../EntityTypes';

enum InvestEventType {
    Create,
    Withdrawl,
    Deposit,
    ZeroOut,
}
@Entity('invest_event')
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
}
