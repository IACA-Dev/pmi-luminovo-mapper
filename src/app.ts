import * as yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import * as dotenv from 'dotenv';
import {Context} from "./Context";

dotenv.config();

const argv = yargs(hideBin(process.argv))
    .option('d', {
        alias: 'directory',
        type: 'string',
        describe: 'Output directory',
        demandOption: false,
        default : ''
    })
    .option('n', {
        alias: 'company name',
        type: 'string',
        describe: 'Name of company',
        demandOption: true
    })
    .help().argv;

async function main() {

    // 1. GET DATA
    const pmiRepository = Context.providePMIRepository();

    await pmiRepository.open();
    console.log('✅ Database connected.');

    console.log('Retrieving data (take few time)..');
    const articles = await pmiRepository.getAll();
    console.log(`📦️ ${articles.length} articles retrieved.`);

    await pmiRepository.close();
    console.log('Database closed.');

    // 2. CONVERT TO LINES
    const ipnLines = Context.provideIPNConverter().convertToLines(articles);
    console.log('IPN Lines generated.')
    const inventoryLines = Context.provideInventoryConverter().convertToLines(articles);
    console.log('Inventory Lines generated.')

    // 3. EXPORT CSV
    const args = await argv;
    let outputDirectory = args.d;
    if(outputDirectory === '')  outputDirectory = '.'

    const name = args.n;
    const ipnCsvOutputFilePath = `${outputDirectory}/luminovo_${name}_ipns.csv`;
    const inventoryCsvOutputFilePath = `${outputDirectory}/luminovo_${name}_inventory.csv`;

    await Context.createLuminovoCSVIPNGenerator(ipnLines).generate(ipnCsvOutputFilePath);
    await Context.createLuminovoCSVInventoryGenerator(inventoryLines).generate(inventoryCsvOutputFilePath);

    console.log(`✅ Files generated !\n\n\t▶️IPN : ${ipnCsvOutputFilePath}\n\t▶️Inventory : ${inventoryCsvOutputFilePath}`);
}

main().then().catch(console.error);

