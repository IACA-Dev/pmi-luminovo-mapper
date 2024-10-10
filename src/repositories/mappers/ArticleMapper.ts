import {ArticleEntity} from "../../entities/ArticleEntity";
import {isString} from "../../utils/Types";


export abstract class ArticleMapper {

    public static map(source: any): ArticleEntity {
        const description = ArticleMapper.getDescription(source);
        const pckg = isString(source.ARCTCODFAM) ? source.ARCTCODFAM.trim() : ''
        const unit = isString(source.ARCTEXPU) ? ArticleMapper.getUnitValueFromLetter(source.ARCTEXPU.trim()) : 1

        return {
            internalRef: `${source.ARKTCODART.trim()}${source.ARKTCOMART.trim()}`,
            description: description,
            package: pckg,
            manufacturerRawData : `${source.label}`,
            availableStock: source.ARCNDISPO as number,
            totalStock: source.ARCNSTOPHY as number,
            unitPrice : (source.ARCNPUACH2 as number) / unit
        }

    }

    private static getUnitValueFromLetter(letter : string) {
        switch (letter) {
            case 'M' :
                return 1000;
            case 'C':
                return 100;
            default:
                return 1;
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