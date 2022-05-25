import { Collateral, CollateralCreateRequest } from '@api/io-model';
import { CreateClassFactory } from '@appleptr16/utilities';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { LoanEntity } from '../loans/Loan.entity';

@Entity('collateral')
export class CollateralEntity implements Collateral {
    static create = new CreateClassFactory(CollateralEntity).createFn();
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @ManyToOne(() => LoanEntity, (loan) => loan.collateral)
    loan: string;
    @Column('varchar')
    comments: string;
}
