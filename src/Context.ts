import {PMIRepository} from "./repositories/PMIRepository";
import {PMIRepositoryImpl} from "./repositories/PMIRepositoryImpl";
import {ArticleToLuminovoIPNConverter} from "./services/ArticleToLuminovoIPNConverter";
import {ArticleToLuminovoIPNConverterImpl} from "./services/ArticleToLuminovoIPNConverterImpl";
import {ManufacturerParserImpl} from "./services/ManufacturerParserImpl";
import {ArticleToLuminovoInventoryConverter} from "./services/ArticleToLuminovoInventoryConverter";
import {ArticleToLuminovoInventoryConverterImpl} from "./services/ArticleToLuminovoInventoryConverterImpl";
import {LuminovoCSVGenerator} from "./services/LuminovoCSVGenerator";
import {LuminovoCSVIpnGenerator} from "./services/LuminovoCSVIpnGenerator";
import {LuminovoIPNLine} from "./entities/LuminovoIPNLine";
import {LuminovoInventoryLine} from "./entities/LuminovoInventoryLine";
import {LuminovoCSVInventoryGenerator} from "./services/LuminovoCSVInventoryGenerator";

export class Context {

    public static providePMIRepository(): PMIRepository {
        return new PMIRepositoryImpl({
            host: process.env.DB_SERVER || 'localhost',
            user: process.env.DB_USER || 'sa',
            password: process.env.DB_PASSWORD || '',
            database: process.env.DB_DATABASE || ''
        });
    }

    public static provideIPNConverter() : ArticleToLuminovoIPNConverter {
        return new ArticleToLuminovoIPNConverterImpl(new ManufacturerParserImpl());
    }

    public static provideInventoryConverter() : ArticleToLuminovoInventoryConverter {
        return new ArticleToLuminovoInventoryConverterImpl();
    }

    public static createLuminovoCSVIPNGenerator(lines : LuminovoIPNLine[]) : LuminovoCSVGenerator {
        return new LuminovoCSVIpnGenerator(lines);
    }

    public static createLuminovoCSVInventoryGenerator(lines : LuminovoInventoryLine[]) : LuminovoCSVGenerator {
        return new LuminovoCSVInventoryGenerator(lines);
    }
}