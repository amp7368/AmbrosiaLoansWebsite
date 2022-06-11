import { Collateral } from '@api/io-model';
import { CreateClassFactory } from '@appleptr16/utilities';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { InvestEventEntity } from '../../investment/InvestEvent.entity';

@Entity('collateral_invest')
export class CollateralInvestEntity implements Collateral {
    static create = new CreateClassFactory(CollateralInvestEntity).createFn();
    @PrimaryGeneratedColumn('uuid')
    uuid: string;
    @Column('varchar')
    comments: string;
    @Column('timestamp')
    depositDate: Date;
    @Column('timestamp', { nullable: true })
    withdrawlDate: Date;
    @ManyToOne(() => InvestEventEntity, (event) => event.collateral)
    event: InvestEventEntity;
}
