import { Collateral } from '@api/io-model';
import { CreateClassFactory } from '@appleptr16/utilities';
import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { EntityTables } from '../EntityTables';

@Entity(EntityTables.Collateral)
export class CollateralEntity implements Collateral {
    static create = new CreateClassFactory(CollateralEntity).createFn();
    @PrimaryGeneratedColumn('uuid')
    uuid: string;
    @Column('varchar')
    comments: string;
    @Column('timestamp')
    depositDate: Date;
    @Column('timestamp', { nullable: true })
    withdrawlDate: Date;
}
