import {ManufacturerParser} from "./ManufacturerParser";
import {ManufacturerEntity} from "../entities/ManufacturerEntity";


export class ManufacturerParserImpl implements ManufacturerParser {

    parse(source: string): ManufacturerEntity[] {
        const result: ManufacturerEntity[] = [];
        const pairs = source.split(";");

        for (let pair of pairs) {
            const splitPair = pair.split(":");
            const isOnlyRef = splitPair.length === 1 && splitPair[0].trim() !== '';
            const isNameRefPair = splitPair.length > 1;
            const containsTag = splitPair.length > 1 && splitPair[1].trim().startsWith('{') && splitPair[1].indexOf('}') >= 0;
            const isSupported = isOnlyRef || isNameRefPair;

            let name = ''
            let ref = '';

            if (containsTag) {
                name = splitPair[0].trim();
                ref = this.extractRefFromBracesTage(splitPair[1]);
            } else if (isNameRefPair) {
                name = splitPair[0].trim();
                ref = splitPair[1].trim();
            } else if (isOnlyRef) {
                ref = splitPair[0].trim();
            }


            if (isSupported)
                result.push({
                    name: name,
                    ref: ref
                });
        }

        return result;
    }

    private extractRefFromBracesTage = (input: string): string => {
        const matches = input.match(/\{([^}]+)\}/);
        if (matches && matches.length > 0) {
            return matches[0].slice(1, -1);
        }
        return input;
    };
}