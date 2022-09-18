import {
    createQueryBuilder,
    DeepPartial,
    EntityTarget,
    FindManyOptions,
    FindOneOptions,
    getConnection,
    getManager,
    QueryBuilder,
    Repository,
} from 'typeorm';

export class AmbrosiaQuery<T> {
    constructor(
        private target: EntityTarget<T>,
        private alias: string,
        private relations: string[] = []
    ) {}
    qb(): QueryBuilder<T> {
        return this.repo().createQueryBuilder(this.alias);
    }
    repo(): Repository<T> {
        return getConnection().getRepository(this.target);
    }
    private getRelations(otherRelations?: string[]) {
        return [...this.relations, ...(otherRelations ?? [])];
    }
    async list(options?: FindManyOptions<T>): Promise<T[]> {
        const relations: string[] = this.getRelations(options?.relations);
        const response: T[] = await this.repo().find({ ...options, relations });
        return response ?? [];
    }
    async findByIds(ids: unknown[]): Promise<T[]> {
        return await this.repo().findByIds(ids);
    }
    async findOne(id: any, options?: FindOneOptions<T>): Promise<T> {
        const relations: string[] = this.getRelations(options?.relations);
        return await this.repo().findOne(id, { ...options, relations });
    }

    async save(entity: DeepPartial<T>): Promise<T> {
        return await this.repo().save(entity);
    }
}
