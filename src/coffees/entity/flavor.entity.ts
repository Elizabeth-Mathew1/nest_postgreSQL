import { Column, Entity, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm"
import { Coffee } from "./coffee.entity"
@Entity()
export class Flavor{
    
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name:string

    @ManyToMany(
        type => Coffee,
        (coffee) => coffee.flavors,
    )
    coffees: Coffee[]


}

function PrimaryGeneratingColumn() {
    throw new Error("Function not implemented.")
}
