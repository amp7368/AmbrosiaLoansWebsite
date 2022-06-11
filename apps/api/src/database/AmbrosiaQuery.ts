import { DeepPartial, getManager } from 'typeorm';

export class AmbrosiaQuery<T> {
    constructor(private target: new () => T, private alias: string) {}
    managerQB() {
        return getManager().createQueryBuilder(this.target, this.alias);
    }
    repo() {
        return getManager().getRepository(this.target);
    }
    repoQB() {
        return this.repo().createQueryBuilder(this.alias);
    }
    async list(): Promise<T[]> {
        return await this.repoQB().getMany();
    }
    async findByIds(ids: unknown[]): Promise<T[]> {
        return await this.repo().findByIds(ids);
    }
    async save(entity: DeepPartial<T>): Promise<T> {
        return await this.repo().save(entity);
    }
}
