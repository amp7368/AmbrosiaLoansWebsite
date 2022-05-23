import { CreateClassFactory } from '@appleptr16/utilities';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { InitDb } from '../../InitDb';
import { LoanEntity } from '../loans/Loan.entity';

@Entity('client')
export class ClientEntity {
    static factory = new CreateClassFactory(ClientEntity, () => ({}));
    static create = ClientEntity.factory.createFn();

    @PrimaryGeneratedColumn('uuid')
    uuid: string;
    @Column('varchar', { length: 32 })
    displayName: string;

    // discord
    @Column('bigint')
    discordId: number;
    @Column('varchar', { length: 32 })
    discordTag: string;

    @OneToMany(() => LoanEntity, (loan) => loan.client)
    loans: LoanEntity[];

    // investments
}
