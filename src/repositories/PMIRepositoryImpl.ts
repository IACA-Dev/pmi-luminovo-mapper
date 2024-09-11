import * as sql from 'mssql';
import {PMIRepository} from "./PMIRepository";
import {ArticleEntity} from "../entities/ArticleEntity";
import {DatabaseConfig} from "../config/DatabaseConfig";
import {DatabaseError} from "../errors/DatabaseError";
import {ArticleMapper} from "./mappers/ArticleMapper";
import {isUndefined} from "../utils/Types";


export class PMIRepositoryImpl implements PMIRepository {

    private readonly config: DatabaseConfig;
    private pool?: sql.ConnectionPool;

    // ---------------------------------------------------------------------------------------------------------------

    constructor(config: DatabaseConfig) {
        this.config = config;
    }

    // ---------------------------------------------------------------------------------------------------------------

    async open(): Promise<void> {
        try {
            await this.close();
            const config = this.config;
            this.pool = await sql.connect({
                user: config.user,
                password: config.password,
                database: config.database,
                server: config.host,
                options: {
                    trustServerCertificate: true
                }
            });
        } catch (e) {
            PMIRepositoryImpl.throwError(e, "Unable to connect.");
        }
    }

    async close(): Promise<void> {
        try {
            this.pool?.close();
        } catch (e) {
            PMIRepositoryImpl.throwError(e, "Unable to disconnect.");
        }
    }

    // ---------------------------------------------------------------------------------------------------------------

    async getAll(): Promise<ArticleEntity[]> {
        if(isUndefined(this.pool)) throw new DatabaseError("Database not open.");

        const pool = this.pool!;
        const request = pool.request();
        request.multiple = true;
        const result = await request.query<any[]>(`SELECT ARKTCODART, ARKTCOMART, ARCTLIB01, ARCTLIB02, ARCTCODFAM,  dbo.get_libelle_tt_doc_optimized_secure(ARKTCODART, ARKTCOMART) as 'label', ARCNSTOPHY, ARCNDISPO FROM ARTICLE`);

        return result.recordset.map(ArticleMapper.map);
    }

    // ***************************************************************************************************************

    private static throwError(error: unknown, message: string): void {
        if (error instanceof Error)
            throw new DatabaseError(message, error);
        else
            throw new DatabaseError(message);
    }
}