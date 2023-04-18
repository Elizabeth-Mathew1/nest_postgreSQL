import { HttpException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entity/coffee.entity';
import { Flavor } from './entity/flavor.entity';


type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
  create: jest.fn(),
});

describe('CoffeesService', () => {
  let service: CoffeesService;
  let coffeerep:MockRepository;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoffeesService,
      { provide: DataSource, useValue: {}},
      { provide: getRepositoryToken(Flavor), useValue: createMockRepository()},
      { provide: getRepositoryToken(Coffee), useValue: createMockRepository()},
      {
        provide: 'COFFEE_BRANDS',
        useValue: ['Starbucks', 'Kaapi'],
      },
    ]
      
    }).compile();

    service = module.get<CoffeesService>(CoffeesService);
    coffeerep = module.get<MockRepository<Coffee>>(getRepositoryToken(Coffee));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  //unit test for findCoffee

  describe('findCoffee', () => {
    describe('when coffee with ID exists', () => {
      it('should return coffee object', async() => {
        const coffeeid='1';
        let expected_coffee={};
        
        coffeerep.findOne.mockReturnValue(expected_coffee)
        const coffee = await service.findCoffee(coffeeid)
        expect(coffee).toEqual(expected_coffee)
      })
    })
    describe('when coffee with ID does not exist',() => {
      it('should throw error',async() => {
        const coffeeid='1';
        let expected_coffee=undefined;
        coffeerep.findOne.mockReturnValue(expected_coffee)
        try{
        
        const coffee = await service.findCoffee(coffeeid)
        }
        catch(err)
        {
          expect(err).toBeInstanceOf(HttpException);
          expect(err.message).toEqual(`Coffee #${coffeeid} not found`);
        }
      })
    })
  })
});
