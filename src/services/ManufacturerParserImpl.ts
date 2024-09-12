import {ManufacturerParser} from "./ManufacturerParser";
import {ManufacturerEntity} from "../entities/ManufacturerEntity";


export class ManufacturerParserImpl implements ManufacturerParser {

    parse(source: string): ManufacturerEntity[] {
        const result: ManufacturerEntity[] = [];
        const pairs = source.split(";");

        for (let pair of pairs) {
            const splitPair = pair.split(":");

            if (splitPair.length > 1) {
                result.push({
                    name: splitPair[0].trim(),
                    ref: splitPair[1].trim()
                });
            }
        }

        return result;
    }

}