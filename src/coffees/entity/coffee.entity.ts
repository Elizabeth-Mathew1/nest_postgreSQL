import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Flavor } from "./flavor.entity";


@Entity()
export class Coffee {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  brand: string;

  @JoinTable()
  @ManyToMany(
    type => Flavor,
    (flavor) => flavor.coffees,
    {
      cascade:true
    }
  )
  
  flavors: Flavor[]

}