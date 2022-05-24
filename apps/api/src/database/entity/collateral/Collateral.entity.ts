import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { LoanEntity } from '../loans/Loan.entity';

@Entity('collateral')
export class CollateralEntity {
    @PrimaryGeneratedColumn('increment')
    uuid: number;

    @ManyToOne(() => LoanEntity, (loan) => loan.collateral)
    loan: string;
}
