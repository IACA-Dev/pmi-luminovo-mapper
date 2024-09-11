import * as dotenv from 'dotenv';
import {PMIRepositoryImpl} from "./repositories/PMIRepositoryImpl";

dotenv.config();


async function main() {
    const repo = new PMIRepositoryImpl({
        host: process.env.DB_SERVER!,
        user: process.env.DB_USER!,
        database: process.env.DB_DATABASE!,
        password: process.env.DB_PASSWORD!
    });

    await repo.open();

    // Just for debug
    console.log((await repo.getAll()));

    await repo.close();
}

main().then(()=>{
    // Don't hesitate to replace the value with your own initial
    const successMsg = "M+J=<3"
    console.log(successMsg);
}).catch(console.error);

