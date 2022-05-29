import { Loan } from '@api/io-model';
import { CreateClassFactory } from '@appleptr16/utilities';
import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { ClientEntity } from '../client/Client.entity';
import { CollateralEntity } from '../collateral/Collateral.entity';
import { emeraldType, loanRateType } from '../EntityTypes';
import { LoanPaybackEntity } from './payback/LoanPayback.entity';

@Entity('loan')
export class LoanEntity {
    static create = new CreateClassFactory(LoanEntity).createFn();
    @PrimaryGeneratedColumn('uuid')
    uuid: string;
    @ManyToOne(() => ClientEntity, (client) => client.loans)
    client: string;
    @OneToMany(() => CollateralEntity, (collateral) => collateral.loan)
    collateral: CollateralEntity[];

    @Column(emeraldType)
    amountLoaned: number;
    @Column(loanRateType)
    rate: number;
    @Column({ type: 'varchar', length: 100 })
    broker: string;
    @Column('timestamp')
    startDate: Date;
    @OneToMany(() => LoanPaybackEntity, (payback) => payback.loan)
    payback: LoanPaybackEntity[];
}
