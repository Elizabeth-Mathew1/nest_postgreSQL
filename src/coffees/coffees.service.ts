import { HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Http2ServerRequest } from 'http2';
import { findIndex } from 'rxjs';
import { Repository } from 'typeorm';
import { CreateDto } from './dto/dto/createcoffee.dto';
import { PaginationQueryDto } from './dto/dto/paginationquery.dto';
import { UpdateDto } from './dto/dto/updatecoffee.dto';
import { Coffee } from './entity/coffee.entity';
import { Flavor } from './entity/flavor.entity';

@Injectable()
export class CoffeesService 
{
    constructor(
        @InjectRepository(Coffee)
        private readonly coffees: Repository<Coffee>,
        @InjectRepository(Flavor)
        private readonly flavors: Repository<Flavor>,
        @Inject('COFFEE_BRANDS') coffee_brands:string[]
        //console.log(coffee)
    ){
        console.log(coffee_brands) // just for testing non-class based dependencies
    }

    findAll(paginationquery: PaginationQueryDto)
    {
        //const {limit,offset}=paginationquery
        return this.coffees.find({
            relations: {
                flavors: true
            },
            skip: paginationquery.offset,
            take: paginationquery.limit
        });
    }
    async findCoffee(id: string){
        
        
        let item =await this.coffees.findOne({ where: {id: +id},
        relations:{
            flavors:true
        } 
    })
        if(!item)
        throw new HttpException(`Coffee #${id} not found`, HttpStatus.NOT_FOUND)

        else   
            return item;
        
            
    }
    async updateCoffee(updatecoffeedto: UpdateDto)
    {
        const flavors=updatecoffeedto.flavors && await Promise.all(
            updatecoffeedto.flavors.map(name => this.preloadFlavour(name)))
        const item = await this.coffees.preload({
            ...updatecoffeedto,
            flavors
        })
        
        return this.coffees.save(item)
    }
    async addCoffee(createcoffeesdto : CreateDto)
    {
        const flavors=await Promise.all( createcoffeesdto.flavors.map(name => this.preloadFlavour(name)))
        const item = this.coffees.create({
            ...createcoffeesdto,
            flavors,
        })
        return this.coffees.save(item)
    }

    async removeCoffee(cid: string)
    {
        const item= await this.coffees.findOne({where: {id:+cid}})
        await this.coffees.remove(item)
        return this.coffees.find(
        {
            relations:{
                flavors:true
            }
        }
        )
    }

    async preloadFlavour(name:string):Promise<Flavor>
    {
        const item=await this.flavors.findOne({where:{name}})
        if(item)
            return item
        return this.flavors.create({name})
    }
}
