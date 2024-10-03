import {expect, test, describe} from 'vitest'
import {faker} from '@faker-js/faker';
import {ArticleToLuminovoIPNConverterImpl} from "./ArticleToLuminovoIPNConverterImpl";
import {ManufacturerParser} from "./ManufacturerParser";
import {ManufacturerEntity} from "../entities/ManufacturerEntity";
import {ArticleEntity} from "../entities/ArticleEntity";


describe('ArticleToLuminovoIPNConverterImpl', () => {
    const parserMock = new ManufacturerParserMock();
    const converter = new ArticleToLuminovoIPNConverterImpl(parserMock)


    test('should convert article to Luminovo IPN', () => {
        parserMock.parseMethod = () => [{name: '', ref: ''}, {name: '', ref: ''}, {name: '', ref: ''}]
        const article = generateRandomArticle();
        const result = converter.convertToLine(article);

        expect(result.length).eq(3)

        for (let line of result) {
            expect(line.description).eq(article.description);
            expect(line.package).eq(article.package);
            expect(line.internalRef).eq(article.internalRef);
        }
    });

    test('should convert article to Luminovo IPN even if no manufacturer data', () => {
        parserMock.parseMethod = () => []
        const article = generateRandomArticle();
        const result = converter.convertToLine(article);

        expect(result.length).eq(1)

        const line = result[0];
        expect(line.description).eq(article.description);
        expect(line.package).eq(article.package);
        expect(line.internalRef).eq(article.internalRef);
    });
});

class ManufacturerParserMock implements ManufacturerParser {
    private _parseMethod: (a: string) => ManufacturerEntity[] = () => [];

    parse(source: string): ManufacturerEntity[] {
        return this._parseMethod(source);
    }


    set parseMethod(value: (a: string) => ManufacturerEntity[]) {
        this._parseMethod = value;
    }
}

function generateRandomArticle(): ArticleEntity {
    return {
        internalRef: faker.database.mongodbObjectId(),
        manufacturerRawData: faker.lorem.sentence(),
        description: faker.commerce.productDescription(),
        package: faker.commerce.productMaterial(),
        totalStock: 0,
        availableStock: 0,
        unitPrice : 0
    };
}