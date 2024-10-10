import {describe, expect, test} from "vitest";
import {ArticleMapper} from "./ArticleMapper";
import {ArticleEntity} from "../../entities/ArticleEntity";

describe('ArticleMapper', () => {
    test('should correctly calculate unit price with unit "M"', () => {
        const source = {
            ARKTCODART: 'art1',
            ARKTCOMART: 'com1',
            ARCTCODFAM: 'fam1',
            ARCTEXPU: 'M',
            ARCNDISPO: 10,
            ARCNSTOPHY: 20,
            ARCNPUACH2: 2000,
            ARCTLIB01: 'lib1',
            ARCTLIB02: 'lib2',
            label: 'label1'
        };

        const expected: Partial<ArticleEntity> = {
            unitPrice: 2 // 2000 / 1000 = 2
        };

        const result = ArticleMapper.map(source);
        expect(result.unitPrice).toBe(expected.unitPrice);
    });

    test('should correctly calculate unit price with unit "C"', () => {
        const source = {
            ARKTCODART: 'art2',
            ARKTCOMART: 'com2',
            ARCTCODFAM: 'fam2',
            ARCTEXPU: 'C',
            ARCNDISPO: 15,
            ARCNSTOPHY: 30,
            ARCNPUACH2: 2000,
            ARCTLIB01: 'lib1',
            ARCTLIB02: 'lib2',
            label: 'label2'
        };

        const expected: Partial<ArticleEntity> = {
            unitPrice: 20 // 2000 / 100 = 20
        };

        const result = ArticleMapper.map(source);
        expect(result.unitPrice).toBe(expected.unitPrice);
    });

    test('should correctly calculate unit price with unexpected unit', () => {
        const source = {
            ARKTCODART: 'art3',
            ARKTCOMART: 'com3',
            ARCTCODFAM: 'fam3',
            ARCTEXPU: 'X',
            ARCNDISPO: 5,
            ARCNSTOPHY: 10,
            ARCNPUACH2: 2000,
            ARCTLIB01: 'lib1',
            ARCTLIB02: 'lib2',
            label: 'label3'
        };

        const expected: Partial<ArticleEntity> = {
            unitPrice: 2000 // 2000 / 1 = 2000
        };

        const result = ArticleMapper.map(source);
        expect(result.unitPrice).toBe(expected.unitPrice);
    });

    test('should remove " character from description', () => {
        const source = {
            ARKTCODART: "ART001",
            ARKTCOMART: "COM001",
            ARCTCODFAM: "FAM001 ",
            ARCTEXPU: "M",
            ARCNPUACH2: 1000,
            ARCNDISPO: 50,
            ARCNSTOPHY: 150,
            ARCTLIB01: 'Some "description',
            ARCTLIB02: 'with more text"',
            label: "manufacturerLabel",
        };

        // Since getDescription is a private method, we need to use map method to access it indirectly
        const result = ArticleMapper.map(source);

        const expectedDescription = 'Some description - with more text';

        expect(result.description).toBe(expectedDescription);
    });

});