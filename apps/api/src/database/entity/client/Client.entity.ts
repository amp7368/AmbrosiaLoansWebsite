import { Client } from '@api/io-model';
import { CreateClassFactory } from '@appleptr16/utilities';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { InvestmentEntity } from '../investment/Investment.entity';

import { LoanEntity } from '../loans/Loan.entity';

@Entity('client')
export class ClientEntity implements Client {
    static create = new CreateClassFactory(ClientEntity, () => ({
        loans: [],
        investments: [],
    })).createFn();

    @PrimaryGeneratedColumn('uuid')
    uuid: string;
    @Column('varchar', { length: 32 })
    displayName: string;

    // minecraft
    @Column('uuid', { nullable: true })
    mcId: string;
    @Column('varchar', { length: 64, nullable: true })
    mcName: string;

    // discord
    @Column('bigint', { nullable: true })
    discordId: number;
    @Column('varchar', { length: 32, nullable: true })
    discordTag: string;

    @OneToMany(() => LoanEntity, (loan) => loan.client)
    loans: LoanEntity[];
    @OneToMany(() => InvestmentEntity, (investment) => investment.client)
    investments: InvestmentEntity[];
    // investments
}
