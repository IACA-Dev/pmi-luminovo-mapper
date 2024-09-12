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

    test('should returns empty array if input is empty', () => {
        const parser = new ManufacturerParserImpl();
        const result = parser.parse('');

        expect(result.length).eq(0);
    });

    test('should parse correct formated input part but ignore malformed part', () => {
        const parser = new ManufacturerParserImpl();
        const result = parser.parse('PANASONIC:VL-2020-HFN; PANASONIC:VL2020-1HFE; MAXELL  -- ML 2016 T6');

        expect(result.length).eq(2);
        expect(result[0].name).eq('PANASONIC');
        expect(result[1].name).eq('PANASONIC');

        expect(result[0].ref).eq('VL-2020-HFN');
        expect(result[1].ref).eq('VL2020-1HFE');
    });
})