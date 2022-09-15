import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { EntityTables } from '../EntityTables';

@Entity(EntityTables.Broker)
export class BrokerEntity {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;
    @Column({ type: 'varchar', length: 32 })
    name: string;
}
