import { ItemRefBase } from '@api/io-model';
import { Entity, ManyToOne, OneToOne, PrimaryColumn } from 'typeorm';
import { ItemSlots } from './ItemSlots.entity';

@Entity()
export class ItemRef implements ItemRefBase {
    @PrimaryColumn('uuid')
    instUUID: string;

    @ManyToOne(() => ItemSlots, (referrer) => referrer.items)
    slots: ItemSlots;
}
