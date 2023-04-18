import { Flavor } from "src/coffees/entity/flavor.entity";


export class UpdateDto 
{
    readonly id: number;
    readonly name?: string;
    readonly brand?: string;
    readonly flavors?: string[]
}
