import * as dotenv from 'dotenv';
import {PMIRepositoryImpl} from "./repositories/PMIRepositoryImpl";
import {LuminovoCSVIpnGenerator} from "./services/LuminovoCSVIpnGenerator";
import {LuminovoCSVInventoryGenerator} from "./services/LuminovoCSVInventoryGenerator";

dotenv.config();


async function main() {
    // ############################################################################################################### TEST REPO
    // const repo = new PMIRepositoryImpl({
    //     host: process.env.DB_SERVER!,
    //     user: process.env.DB_USER!,
    //     database: process.env.DB_DATABASE!,
    //     password: process.env.DB_PASSWORD!
    // });
    //
    // await repo.open();
    //
    // // Just for debug
    // console.log((await repo.getAll()));
    //
    // await repo.close();

    // ############################################################################################################### TEST CSV IPN

    // const generator = new LuminovoCSVIpnGenerator([
    //     {
    //         internalRef: "INT-001",
    //         manufacturerName: "ACME Corp.",
    //         manufacturerRef: "ACME-1234",
    //         description: "High precision resistor",
    //         package: "SMD 0805"
    //     },
    //     {
    //         internalRef: "INT-002",
    //         manufacturerName: "ACME Corp.",
    //         manufacturerRef: "ACME-1234",
    //         description: "High precision resistor",
    //         package: "SMD 0805"
    //     },
    //     {
    //         internalRef: "INT-003",
    //         manufacturerName: "ACME Corp.",
    //         manufacturerRef: "ACME-1234",
    //         description: "High precision resistor",
    //         package: "SMD 0805"
    //     }]);
    //
    // await generator.generate("manon.csv")

    // ############################################################################################################### TEST CSV INVENTORY

    const generator = new LuminovoCSVInventoryGenerator([
        {
            internalRef: "INV-001",
            totalStock: 1000,
            availableStock: 750
        },
        {
            internalRef: "INV-001",
            totalStock: 1000,
            availableStock: 750
        },
        {
            internalRef: "INV-001",
            totalStock: 1000,
            availableStock: 750
        }
    ]);

    await generator.generate("manon.csv")
}

main().then(() => {
    // Don't hesitate to replace the value with your own initial
    const successMsg = "M+J=<3"
    console.log(successMsg);
}).catch(console.error);

