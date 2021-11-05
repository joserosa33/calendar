import {AppointmentModel, ClientModel} from '../models';
import {BaseRepository} from './base.repository';
import {Identifier} from "../database";

export class AppointmentRepository extends BaseRepository<AppointmentModel> {
    private tableName = 'appointments';

    add({name, start, end, staff, client, notes}: AppointmentModel): Promise<Identifier> {
        const sql = `INSERT INTO ${this.tableName} (name, start, end, client, staff, notes) VALUES (?, ?, ?, ?, ?, ?)`;
        return this.database.run(sql, [name, start, end, client, staff, notes]);
    }

    getAll(): Promise<AppointmentModel[]> {
        return this.database.all(`SELECT * FROM ${this.tableName}`) as Promise<AppointmentModel[]>;
    }

    getById(id: string): Promise<AppointmentModel> {
        return this.database.get(`SELECT * FROM ${this.tableName} WHERE id=?`, [id]) as Promise<AppointmentModel>;
    }

    delete(id: string): Promise<Identifier> {
        const sql = `DELETE FROM ${this.tableName} WHERE id=?`;
        return this.database.run(sql, [id]);
    }

    createTable(): Promise<Identifier> {
        const sql = `CREATE TABLE IF NOT EXISTS ${this.tableName} (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, start TEXT, end TEXT, client TEXT, staff TEXT, notes TEXT)`;
        return this.database.run(sql)
    }
}