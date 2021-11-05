import {Database, verbose} from 'sqlite3';

const sqlite3 = verbose();

export type Identifier = {
    id: number,
}

class SqliteAgent {
    private db: Database;

    constructor(dbFilePath: string) {
        this.db = new sqlite3.Database(dbFilePath, sqlite3.OPEN_READWRITE, (err => {
            if (err) {
                console.log('Could not connect to database', err)
            } else {
                console.log('Connected to database')
            }
        }));
    }

    run(sql: string, params: unknown[] = []): Promise<Identifier>{
        return new Promise((resolve, reject) => {
            this.db.run(sql, params, function (err) {
                if (err) {
                    console.log('Error running sql ' + sql)
                    console.log(err)
                    reject(err)
                } else {
                    resolve({id: this.lastID})
                }
            })
        })
    }

    get(sql: string, params: unknown[] = []) {
        return new Promise((resolve, reject) => {
            this.db.get(sql, params, (err, result) => {
                if (err) {
                    console.log('Error running sql: ' + sql)
                    console.log(err)
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    }

    all(sql: string, params: unknown[] = []) {
        return new Promise((resolve, reject) => {
            this.db.all(sql, params, (err, rows) => {
                if (err) {
                    console.log('Error running sql: ' + sql)
                    console.log(err)
                    reject(err)
                } else {
                    resolve(rows)
                }
            })
        })
    }
}

export default SqliteAgent;