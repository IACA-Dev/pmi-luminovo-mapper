import {ArticleEntity} from "../../entities/ArticleEntity";

export abstract class ArticleMapper {

    public static map(source: any): ArticleEntity {
        return {
            internalRef: `${source.ARKTCODART}${source.ARKTCOMART}`,
            description: `${source.ARCTLIB01}\n${source.ARCTLIB02}`,
            package: `${source.ARCTCODFAM}`,
            manufacturerRawData : `${source.label}`,
            availableStock: source.ARCNDISPO as number,
            totalStock: source.ARCNSTOPHY as number
        }

    }

}