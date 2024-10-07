import {CSVGeneratingError} from "../errors/CSVGeneratingError";
import {LuminovoInventoryLine} from "../entities/LuminovoInventoryLine";
import {LuminovoCSVGenerator} from "./LuminovoCSVGenerator";
import * as fs from 'fs';
import {encapsuleValue} from "../utils/CSVUtils";


export class LuminovoCSVInventoryGenerator implements LuminovoCSVGenerator {
    private readonly lines : LuminovoInventoryLine[];


    constructor(lines: LuminovoInventoryLine[]) {
        this.lines = lines;
    }

    async generate(output : string) {
        try{
            this.generateCSV(output);
        }catch (e){
            if(e instanceof Error) throw new CSVGeneratingError("Unable to generate CSV.", e);
            else new CSVGeneratingError("Unable to generate CSV (unknown error).");
        }
    }

    private generateCSV(output: string) {
        const csvRows: string[] = [];

        csvRows.push(`"IPN","Available stock","Total stock","Unit price (Amount)"`);

        for (let line of this.lines) {
            csvRows.push(`${encapsuleValue(line.internalRef)},${encapsuleValue(line.availableStock)},${encapsuleValue(line.totalStock)},${encapsuleValue(line.unitPrice)}`);
        }

        const csvContent = csvRows.join('\n');

        fs.writeFileSync(output, csvContent);
    }
}