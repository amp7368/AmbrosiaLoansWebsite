import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('broker')
export class BrokerEntity {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;
    @Column({ type: 'varchar', length: 32 })
    name: string;
}
