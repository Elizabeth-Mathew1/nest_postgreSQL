import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entity/coffee.entity';
import { Flavor } from './entity/flavor.entity';
import { CoffeeRatingModule } from '../coffee-rating/coffee-rating.module';



@Module({
    controllers:[CoffeesController],
    providers:[CoffeesService,
    { 
      provide: 'COFFEE_BRANDS',
      useValue:['Starbucks','Kaapi']
    },
  
    ],
    imports:[TypeOrmModule.forFeature([Coffee,Flavor])],
    exports:[CoffeesService]
})
export class CoffeesModule {}