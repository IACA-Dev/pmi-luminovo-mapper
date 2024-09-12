import {ArticleToLuminovoInventoryConverter} from "./ArticleToLuminovoInventoryConverter";
import {LuminovoInventoryLine} from "../entities/LuminovoInventoryLine";
import {ArticleEntity} from "../entities/ArticleEntity";


export class ArticleToLuminovoInventoryConverterImpl implements ArticleToLuminovoInventoryConverter {


    convertToLine(article: ArticleEntity): LuminovoInventoryLine {
        return {
            internalRef : article.internalRef,
            totalStock : article.totalStock,
            availableStock : article.availableStock
        };
    }

    convertToLines(articles: ArticleEntity[]): LuminovoInventoryLine[] {
        return articles.map(this.convertToLine);
    }
}