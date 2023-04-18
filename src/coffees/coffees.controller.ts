import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ParamsTokenFactory } from '@nestjs/core/pipes';
import { InjectRepository } from '@nestjs/typeorm';
import { create } from 'domain';
import { Repository } from 'typeorm';
import { CoffeesService } from './coffees.service';
import { CreateDto } from './dto/dto/createcoffee.dto';
import { PaginationQueryDto } from './dto/dto/paginationquery.dto';
import { UpdateDto } from './dto/dto/updatecoffee.dto';
import { Coffee } from './entity/coffee.entity';
import { isPublic } from 'src/common/decorators/ispublic.decorator';
@Controller('coffees')
export class CoffeesController {
    constructor(private coffeeservice: CoffeesService){}
    
    
    @Get('allcups')
    findAll(@Query() paginationquery: PaginationQueryDto)
    {
        
        return this.coffeeservice.findAll(paginationquery)
    }
    @isPublic()
    @Get('mycup')
    findmyCoffee()
    {
        return ('Your cup of coffee!')
    }
    @Get(':id')
    findCoffeeId(@Param('id') id:string )
    {
        return this.coffeeservice.findCoffee(id)
    }
    @Post()
    async create(@Body() createcoffeesdto: CreateDto )
    {
        return this.coffeeservice.addCoffee(createcoffeesdto)
    }
    @Patch()
    async update(@Body() updatecoffeedto: UpdateDto)
    {
        return this.coffeeservice.updateCoffee(updatecoffeedto)
    }

    @Delete(':id')
    async delete(@Param('id') cid:string)
    {
        return this.coffeeservice.removeCoffee(cid)
    }

}