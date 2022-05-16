import { CreateClassFactory } from '@appleptr16/utilities';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ClientProfile {
    static factory = new CreateClassFactory(ClientProfile, () => ({}));
    static create = ClientProfile.factory.createFn();

    @PrimaryGeneratedColumn('uuid')
    uuid: string;
    @Column('varchar', { length: 32 })
    displayName: string;

    // discord
    @Column('bigint')
    discordId: number;
    @Column('varchar', { length: 32 })
    discordTag: string;

    // loans stuff
    @Column('integer')
    credit: number;
    @Column('bigint')
    emeraldsInvested: number;
}
