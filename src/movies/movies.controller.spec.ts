import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { MovieRepository } from './repositories/movie.repository';

describe('MoviesController', () => {
  let controller: MoviesController;
  let service: MoviesService;
  const movieObj = {
    id: '123',
    title: 'The Whale',
    description: 'Darren Aronofsky new movie',
    duration: '1h57',
    note: 0,
  };
  const mockedModel = {
    create: jest.fn(() => Promise.resolve(movieObj)),
    find: jest.fn(() => Promise.resolve([movieObj])),
    findById: jest.fn(() => Promise.resolve(movieObj)),
    updateOne: jest.fn(() => Promise.resolve(movieObj)),
    deleteOne: jest.fn(() => Promise.resolve(true)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [
        MoviesService,
        MovieRepository,
        {
          provide: getModelToken(Movie.name),
          useValue: mockedModel,
        },
      ],
    }).compile();

    controller = module.get<MoviesController>(MoviesController);
    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call method create in the service', async () => {
      const data: CreateMovieDto = {
        title: 'The Killing of a Sacredd Deer',
        description: 'Yorgos Lanthimos movie',
        duration: '2h',
      };
      const spy = jest.spyOn(service, 'create');
      const result = await controller.create(data);
      expect(spy).toBeCalled();
      expect(result).toEqual(movieObj);
    });
  });

  describe('findAll', () => {
    it('should return all documents in the database', async () => {
      const spy = jest.spyOn(service, 'findAll');
      const result = await controller.findAll();
      expect(spy).toBeCalled();
      expect(result).toEqual([movieObj]);
    });
  });

  describe('findOne', () => {
    it('should return all documents in the database', async () => {
      const spy = jest.spyOn(service, 'findOne');
      const result = await controller.findOne('123');
      expect(spy).toBeCalled();
      expect(result).toEqual(movieObj);
    });
  });

  describe('update', () => {
    it('should update a instance with the given id', async () => {
      const id = '123';
      const data = {
        description: 'Teste',
      };
      const spy = jest.spyOn(service, 'update');
      const result = await controller.update(id, data);
      expect(spy).toBeCalled();
      expect(result).toEqual(movieObj);
    });
  });

  describe('delete', () => {
    it('should delete a instance with the given id', async () => {
      const spy = jest.spyOn(service, 'remove');
      const result = await controller.remove('123');
      expect(spy).toBeCalled();
      expect(result).toBe(true);
    });
  });

  describe('rate', () => {
    it('should rate a instance with the given id', async () => {
      const id = '123';
      const data = {
        note: 10,
      };
      const spy = jest.spyOn(service, 'rate');
      const result = await controller.rate(id, data);
      expect(spy).toBeCalled();
      expect(result).toEqual(movieObj);
    });
  });
});
