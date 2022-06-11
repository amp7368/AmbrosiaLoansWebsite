import { Collateral } from '@api/io-model';
import { CreateClassFactory } from '@appleptr16/utilities';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { LoanEventEntity } from '../../loans/LoanEvent.entity';

@Entity('collateral_loan')
export class CollateralLoanEntity implements Collateral {
    static create = new CreateClassFactory(CollateralLoanEntity).createFn();
    @PrimaryGeneratedColumn('uuid')
    uuid: string;
    @Column('varchar')
    comments: string;
    @Column('timestamp')
    depositDate: Date;
    @Column('timestamp', { nullable: true })
    withdrawlDate: Date;
    @ManyToOne(() => LoanEventEntity, (event) => event.collateral)
    event: LoanEventEntity;
}
