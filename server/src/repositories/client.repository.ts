import {ClientModel, StaffModel} from '../models';
import {BaseRepository} from './base.repository';
import {Identifier} from "../database";

export class ClientRepository extends BaseRepository<ClientModel> {
    private tableName = 'clients';

    add({name}: ClientModel): Promise<Identifier> {
        const sql = `INSERT INTO ${this.tableName} (name) VALUES (?)`;
        return this.database.run(sql, [name]);
    }

    getAll(): Promise<ClientModel[]> {
        return this.database.all(`SELECT * FROM ${this.tableName}`) as Promise<ClientModel[]>;
    }

    getById(id: string): Promise<ClientModel> {
        return this.database.get(`SELECT * FROM ${this.tableName} WHERE id=?`, [id]) as Promise<ClientModel>;
    }

    createTable(): Promise<Identifier> {
        const sql = `CREATE TABLE IF NOT EXISTS ${this.tableName} (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)`;
        return this.database.run(sql)
    }

    delete(id: string): Promise<Identifier> {
        const sql = `DELETE FROM ${this.tableName} WHERE id=?`;
        return this.database.run(sql, [id]);
    }
}