import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { BrokerEntity } from '../broker/Broker.entity';
import { ClientEntity } from '../client/Client.entity';
import { CollateralEntity } from '../collateral/Collateral.entity';
import { emeraldType, loanRateType } from '../EntityTypes';
import { LoanPaybackEntity } from './payback/LoanPayback';

@Entity('loan')
export class LoanEntity {
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
    @Column('uuid')
    broker: string;
    @Column('datetime')
    startDate: Date;
    @OneToMany(() => LoanPaybackEntity, (payback) => payback.loan)
    payback: LoanPaybackEntity[];
}
