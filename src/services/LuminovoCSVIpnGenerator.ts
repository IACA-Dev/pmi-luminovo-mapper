import {LuminovoIPNLine} from "../entities/LuminovoIPNLine";
import {CSVGeneratingError} from "../errors/CSVGeneratingError";
import * as fs from 'fs';
import {LuminovoCSVGenerator} from "./LuminovoCSVGenerator";


export class LuminovoCSVIpnGenerator implements LuminovoCSVGenerator {
    private readonly lines : LuminovoIPNLine[];


    constructor(lines: LuminovoIPNLine[]) {
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

        for (let line of this.lines) {
            csvRows.push(`${line.internalRef},${line.manufacturerName},${line.manufacturerRef},${line.description},${line.package}`);
        }

        const csvContent = csvRows.join('\n');

        fs.writeFileSync(output, csvContent);
    }
}