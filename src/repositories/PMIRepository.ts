import {ArticleEntity} from "../entities/ArticleEntity";


export interface PMIRepository {
    open() : Promise<void>;
    close() : Promise<void>;

    getAll() : Promise<ArticleEntity[]>
}