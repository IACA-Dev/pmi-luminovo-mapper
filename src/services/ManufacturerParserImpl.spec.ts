import {expect, test, describe} from 'vitest'
import {ManufacturerParserImpl} from "./ManufacturerParserImpl";

describe('ManufacturerParserImpl', () => {
    test('should parse manufacturer', () => {
        const parser = new ManufacturerParserImpl();
        const result = parser.parse('PANASONIC:VL-2020-HFN; PANASONIC:VL2020-1HFE; MAXELL:ML 2016 T6');

        expect(result.length).eq(3);
        expect(result[0].name).eq('PANASONIC');
        expect(result[1].name).eq('PANASONIC');
        expect(result[2].name).eq('MAXELL');

        expect(result[0].ref).eq('VL-2020-HFN');
        expect(result[1].ref).eq('VL2020-1HFE');
        expect(result[2].ref).eq('ML 2016 T6');
    });

    test('should parse manufacturer with only ref', () => {
        const parser = new ManufacturerParserImpl();
        const result = parser.parse('VL-2020-HFN; VL2020-1HFE; ML 2016 T6');

        expect(result.length).eq(3);
        expect(result[0].name).eq('');
        expect(result[1].name).eq('');
        expect(result[2].name).eq('');

        expect(result[0].ref).eq('VL-2020-HFN');
        expect(result[1].ref).eq('VL2020-1HFE');
        expect(result[2].ref).eq('ML 2016 T6');
    });


    test('should returns empty array if input is empty', () => {
        const parser = new ManufacturerParserImpl();
        const result = parser.parse('');

        expect(result.length).eq(0);
    });

    test('should parse manufacturer with tags', () => {
        const parser = new ManufacturerParserImpl();
        const result = parser.parse('LEGO:{HDHBD NNDJKD KKDKDK} salut; PANASONIC:{VL2020-1HFE} toto');

        expect(result.length).eq(2);
        expect(result[0].name).eq('LEGO');
        expect(result[1].name).eq('PANASONIC');

        expect(result[0].ref).eq('HDHBD NNDJKD KKDKDK');
        expect(result[1].ref).eq('VL2020-1HFE');
    });

    test('should parse manufacturer with tags and ignore malformed', () => {
        const parser = new ManufacturerParserImpl();
        const result = parser.parse('BIM : BOM} toto ; LEGO:{HDHBD NNDJKD KKDKDK} salut; TADUM : {NETFLIX ; PANASONIC:{VL2020-1HFE} toto');

        expect(result.length).eq(4);
        expect(result[0].name).eq('BIM');
        expect(result[1].name).eq('LEGO');
        expect(result[2].name).eq('TADUM');
        expect(result[3].name).eq('PANASONIC');

        expect(result[0].ref).eq('BOM} toto');
        expect(result[1].ref).eq('HDHBD NNDJKD KKDKDK');
        expect(result[2].ref).eq('{NETFLIX');
        expect(result[3].ref).eq('VL2020-1HFE');
    });

    test('should parse manufacturer with mixed format', () => {
        const parser = new ManufacturerParserImpl();
        const result = parser.parse('PANASONIC:VL-2020-HFN; PANASONIC:{VL2020-1HFE} toto;ML 2016 T6');

        expect(result.length).eq(3);
        expect(result[0].name).eq('PANASONIC');
        expect(result[1].name).eq('PANASONIC');
        expect(result[2].name).eq('');

        expect(result[0].ref).eq('VL-2020-HFN');
        expect(result[1].ref).eq('VL2020-1HFE');
        expect(result[2].ref).eq('ML 2016 T6');
    });
})