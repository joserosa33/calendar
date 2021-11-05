import SqliteAgent, {Identifier} from '../database';

export abstract class BaseRepository<T> {
    abstract getById(id: string): Promise<T>;

    abstract getAll(): Promise<T[]>

    abstract add(object: T): Promise<Identifier>;

    abstract delete(id: string): Promise<Identifier>

    abstract createTable(): Promise<Identifier>;

    protected database: SqliteAgent;

    constructor(database: SqliteAgent) {
        this.database = database;
    }
}