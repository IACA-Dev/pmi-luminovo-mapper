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
            const availableStock = this.zeroIfNegative(line.availableStock);
            const totalStock = this.zeroIfNegative(line.totalStock);
            csvRows.push(`${encapsuleValue(line.internalRef)},${encapsuleValue(availableStock)},${encapsuleValue(totalStock)},${encapsuleValue(line.unitPrice)}`);
        }

        const csvContent = csvRows.join('\n');

        fs.writeFileSync(output, csvContent);
    }

    private zeroIfNegative(value : number) : number {
        return value > 0 ? value : 0;
    }
}