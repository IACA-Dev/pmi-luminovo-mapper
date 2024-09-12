import {ArticleEntity} from "../entities/ArticleEntity";
import {LuminovoIPNLine} from "../entities/LuminovoIPNLine";


export interface ArticleToLuminovoIPNConverter {
    convertToLine(article : ArticleEntity) : LuminovoIPNLine[];
    convertToLines(articles : ArticleEntity[]) : LuminovoIPNLine[];
}