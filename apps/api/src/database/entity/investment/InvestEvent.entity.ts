import { CreateClassFactory } from '@appleptr16/utilities';
import { InvestEvent } from 'libs/api-iomodel/src/api/investment/InvestmentEvent';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CollateralInvestEntity } from '../collateral/entity/CollateralInvest.entity';
import { emeraldType } from '../EntityTypes';

enum InvestEventType {
    Create,
    Withdrawl,
    Deposit,
    ZeroOut,
}
@Entity('invest_event')
export class InvestEventEntity implements InvestEvent {
    static create = new CreateClassFactory(InvestEvent).createFn();
    // metadata
    @PrimaryGeneratedColumn('uuid')
    uuid: string;
    @Column('timestamp')
    date: Date;

    // content
    @Column({ type: 'enum', enum: InvestEventType })
    eventType: string;
    @Column(emeraldType)
    emeraldChange: number;

    @OneToMany(() => CollateralInvestEntity, (collateral) => collateral.event)
    collateral: CollateralInvestEntity[];
}
