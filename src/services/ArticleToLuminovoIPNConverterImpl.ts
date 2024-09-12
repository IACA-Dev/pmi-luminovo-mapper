import {ArticleEntity} from "../entities/ArticleEntity";
import {LuminovoIPNLine} from "../entities/LuminovoIPNLine";
import {ArticleToLuminovoIPNConverter} from "./ArticleToLuminovoIPNConverter";
import {ManufacturerParser} from "./ManufacturerParser";


export class ArticleToLuminovoIPNConverterImpl implements ArticleToLuminovoIPNConverter {

    private readonly manufacturerParser : ManufacturerParser;

    // ---------------------------------------------------------------------------------------------------------------

    constructor(manufacturerParser: ManufacturerParser) {
        this.manufacturerParser = manufacturerParser;
    }

    // ***************************************************************************************************************

    convertToLines(articles: ArticleEntity[]): LuminovoIPNLine[] {
        const lines : LuminovoIPNLine[] = [];
        for (let article of articles) {
            this.convertToLine(article).forEach((l)=>lines.push(l));
        }
        return lines;
    }



    convertToLine(article: ArticleEntity): LuminovoIPNLine[] {
        const lines : LuminovoIPNLine[] = [];
        const manufacturerData = this.manufacturerParser.parse(article.manufacturerRawData);

        for (let manufacturer of manufacturerData) {
            lines.push({
                internalRef : article.internalRef,
                package : article.package,
                manufacturerName : manufacturer.name,
                manufacturerRef : manufacturer.ref,
                description : article.description
            });
        }

        if(manufacturerData.length === 0)
            lines.push({
                internalRef : article.internalRef,
                package : article.package,
                manufacturerName : '',
                manufacturerRef : '',
                description : article.description
            });

        return lines;
    }


}