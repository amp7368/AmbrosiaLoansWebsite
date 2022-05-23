import { Entity, ManyToOne } from 'typeorm';
import { LoanEntity } from '../loans/Loan.entity';

@Entity('collateral')
export class CollateralEntity {
    @ManyToOne(() => LoanEntity, (loan) => loan.collateral)
    loan: string;
}
