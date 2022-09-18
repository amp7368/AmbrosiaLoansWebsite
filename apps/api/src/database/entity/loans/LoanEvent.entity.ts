import { Loan } from '@api/io-model';
import { CreateClassFactory } from '@appleptr16/utilities';
import { IsOptional } from 'class-validator';
import { LoanEvent, LoanEventType } from 'libs/api-iomodel/src/api/loan-event';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToMany,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { CollateralEntity } from '../collateral/Collateral.entity';
import { EntityTables } from '../EntityTables';

import { emeraldType } from '../EntityTables';
import { LoanEntity } from './Loan.entity';

@Entity(EntityTables.LoanEvent)
export class LoanEventEntity implements LoanEvent {
    static create = new CreateClassFactory(LoanEventEntity).createFn();
    // metadata
    @PrimaryGeneratedColumn('uuid')
    uuid: string;
    @Column('timestamp')
    date: Date;

    // content
    @Column({ type: 'enum', enum: LoanEventType })
    eventType: LoanEventType;
    @Column(emeraldType)
    emeraldChange: number;

    @ManyToOne(() => CollateralEntity, { nullable: true })
    collateral?: CollateralEntity;

    @ManyToOne(() => LoanEntity, (loan) => loan.history)
    loan: LoanEntity;
}
