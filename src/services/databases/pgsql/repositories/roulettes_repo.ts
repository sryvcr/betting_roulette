import { Client } from "pg";
import { StorageError } from "../../../errors/common/storage_error";
import { clients } from "../client";

const PSQL_CLIENT = process.env.PSQL_CLIENT || "postgres"

export class RoulettesPSQLRepo {
    database: Client
    
    constructor() {
        this.database = clients.get(PSQL_CLIENT);
    }

    async getAllItems() {
        try {
            const result = await this.database.query(
                `
                SELECT id,
                    roulette_status_id,
                    roulette_status
                FROM betting_roulette
                GROUP BY id, roulette_status_id, roulette_status
                `
            );
            return result.rows;
        } catch (error) {
            throw new StorageError(error.message);
        }
    }


    async countItems() {
        try {
            const result = await this.database.query(
                `
                SELECT id
                FROM betting_roulette
                GROUP BY id
                `
            );
            return result.rowCount;
        } catch (error) {
            throw new StorageError(error.message);
        }
    }
}
