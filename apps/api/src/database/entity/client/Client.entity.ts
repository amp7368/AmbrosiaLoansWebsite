import { CreateClassFactory } from '@appleptr16/utilities';
import { Entity, PrimaryGeneratedColumn, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class ClientProfile {
    static factory = new CreateClassFactory(ClientProfile, () => ({}));
    static create = ClientProfile.factory.createFn();

    @PrimaryGeneratedColumn('uuid')
    uuid: string;
    @Column('displayName')
    displayName: string;

    // discord
    @Column('bigint')
    discordId: number;
    @Column('nchar', { length: 32 })
    discordTag: string;

    @Column('integer')
    credit: number;
}
