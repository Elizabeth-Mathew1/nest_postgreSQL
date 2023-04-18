import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesController } from './coffees/coffees.controller';
import { CoffeesModule } from './coffees/coffees.module';
import { Coffee } from './coffees/entity/coffee.entity';
import { Flavor } from './coffees/entity/flavor.entity';
import { CoffeeRatingModule } from './coffee-rating/coffee-rating.module';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './common/common.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
    type: 'postgres', // type of our database
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities:[
        Coffee,
        Flavor
      ], // models will be loaded automatically 
      synchronize: true,
    
  }),
    CoffeesModule,
    CoffeeRatingModule,
    CommonModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
