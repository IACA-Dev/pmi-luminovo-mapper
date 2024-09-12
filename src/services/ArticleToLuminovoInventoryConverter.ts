import {ArticleEntity} from "../entities/ArticleEntity";
import {LuminovoInventoryLine} from "../entities/LuminovoInventoryLine";


export interface ArticleToLuminovoInventoryConverter {

    convertToLine(article : ArticleEntity) : LuminovoInventoryLine;
    convertToLines(articles : ArticleEntity[]) : LuminovoInventoryLine[];

}