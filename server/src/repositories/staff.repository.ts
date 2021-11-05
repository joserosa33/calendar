import {StaffModel} from '../models';
import {BaseRepository} from './base.repository';
import {Identifier} from "../database";

export class StaffRepository extends BaseRepository<StaffModel> {
    private tableName = 'staff';

    add({firstName, lastName}: StaffModel): Promise<Identifier> {
        const sql = `INSERT INTO ${this.tableName} (firstName, lastName) VALUES (?, ?)`;
        return this.database.run(sql, [firstName, lastName]);
    }

    getAll(): Promise<StaffModel[]> {
        return this.database.all(`SELECT * FROM ${this.tableName}`) as Promise<StaffModel[]>;
    }

    getById(id: string): Promise<StaffModel> {
        return this.database.get(`SELECT * FROM ${this.tableName} WHERE id=?`, [id]) as Promise<StaffModel>;
    }

    createTable(): Promise<Identifier> {
        const sql = `CREATE TABLE IF NOT EXISTS ${this.tableName} (id INTEGER PRIMARY KEY AUTOINCREMENT, firstName TEXT, lastName TEXT)`;
        return this.database.run(sql)
    }

    delete(id: string): Promise<Identifier> {
        const sql = `DELETE FROM ${this.tableName} WHERE id=?`;
        return this.database.run(sql, [id]);
    }
}