import { CreateClassFactory } from '@appleptr16/utilities';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { emeraldType } from '../../EntityTypes';
import { LoanEntity } from '../Loan.entity';

@Entity('loan_payback')
export class LoanPaybackEntity {
    static create = new CreateClassFactory(LoanPaybackEntity).createFn();
    @PrimaryGeneratedColumn('increment')
    uuid: number;

    @ManyToOne(() => LoanEntity, (loan) => loan.payback)
    loan: LoanEntity;

    @Column('timestamp')
    paybackDate: Date;
    @Column(emeraldType)
    amountBack: number;
}
