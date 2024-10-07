import {ArticleEntity} from "../../entities/ArticleEntity";
import {isString} from "../../utils/Types";


export abstract class ArticleMapper {

    public static map(source: any): ArticleEntity {
        const description = ArticleMapper.getDescription(source);
        const pckg = isString(source.ARCTCODFAM) ? source.ARCTCODFAM.trim() : ''

        return {
            internalRef: `${source.ARKTCODART.trim()}${source.ARKTCOMART.trim()}`,
            description: description,
            package: pckg,
            manufacturerRawData : `${source.label}`,
            availableStock: source.ARCNDISPO as number,
            totalStock: source.ARCNSTOPHY as number,
            unitPrice : source.ARCNTARIF1 as number
        }

    }

    private static getDescription(source: any) {
        let description = '';

        const lib1 = source.ARCTLIB01;
        const lib2 = source.ARCTLIB02;

        if (isString(source.ARCTLIB01)) description += lib1.trim();
        if (isString(source.ARCTLIB02)) description += (description.length > 0 ? ' - ' : '') + lib2.trim();
        return description;
    }
}