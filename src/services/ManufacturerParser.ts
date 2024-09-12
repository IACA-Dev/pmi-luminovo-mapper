import {ManufacturerEntity} from "../entities/ManufacturerEntity";


export interface ManufacturerParser {

    parse(source : string) : ManufacturerEntity[]

}