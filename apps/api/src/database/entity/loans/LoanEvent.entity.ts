import { LoanEvent, LoanEventType } from '@api/io-model';
import { CreateClassFactory } from '@appleptr16/utilities';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CollateralLoanEntity } from '../collateral/entity/CollateralLoan.entity';

import { emeraldType } from '../EntityTypes';

@Entity('loan_event')
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

    @OneToMany(() => CollateralLoanEntity, (collateral) => collateral.event)
    collateral: CollateralLoanEntity[];
}
