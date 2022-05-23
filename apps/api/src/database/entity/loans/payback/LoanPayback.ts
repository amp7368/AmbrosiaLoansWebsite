import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { emeraldType } from '../../EntityTypes';
import { LoanEntity } from '../Loan.entity';

@Entity('loan_payback')
export class LoanPaybackEntity {
    @PrimaryGeneratedColumn('increment')
    uuid: number;

    @ManyToOne(() => LoanEntity, (loan) => loan.payback)
    loan: LoanEntity;

    @Column('datetime')
    paybackDate: Date;
    @Column(emeraldType)
    amountBack: number;
}
