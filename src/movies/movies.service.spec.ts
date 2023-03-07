import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { getModelToken } from '@nestjs/mongoose';
import { MovieRepository } from './repositories/movie.repository';
import { Movie } from './entities/movie.entity';

describe('MoviesService', () => {
  let service: MoviesService;
  let repository: MovieRepository;
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
      providers: [
        MoviesService,
        MovieRepository,
        {
          provide: getModelToken(Movie.name),
          useValue: mockedModel,
        },
      ],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
    repository = module.get<MovieRepository>(MovieRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should allows to create a document of a movie', async () => {
      const data = {
        title: 'The Whale',
        description: 'Darren Aronofsky new movie',
        duration: '1h57',
      };
      const spy = jest.spyOn(repository, 'create');
      const result = await service.create(data);
      expect(spy).toBeCalledTimes(1);
      expect(result).toEqual(movieObj);
    });
  });

  describe('findAll', () => {
    it('should return all movies in the database', async () => {
      const spy = jest.spyOn(repository, 'find');
      const result = await service.findAll();
      expect(spy).toBeCalled();
      expect(result).toEqual([movieObj]);
    });
  });

  describe('findOne', () => {
    it('should return a instance of movie with the id given', async () => {
      const id = '123';
      const spy = jest.spyOn(repository, 'findOne');
      const result = await service.findOne(id);
      expect(spy).toBeCalled();
      expect(result).toEqual(movieObj);
    });
  });

  describe('update', () => {
    it('should update a instance of movie with the given id', async () => {
      const id = '123';
      const data = {
        description: 'Quantin Tarantino last movie',
      };
      const spy = jest.spyOn(repository, 'update');
      const result = await service.update(id, data);
      expect(spy).toBeCalled();
      expect(result).toEqual(movieObj);
    });
  });

  describe('delete', () => {
    it('should remove a instance of movie from database with the given id', async () => {
      const id = '123';
      const spy = jest.spyOn(repository, 'delete');
      const result = await service.remove(id);
      expect(spy).toBeCalled();
      expect(result).toBe(true);
    });
  });

  describe('rate', () => {
    it('should rate a movie with the given id', async () => {
      const id = '123';
      const data = {
        note: 10,
      };
      const spy = jest.spyOn(repository, 'rate');
      const result = await service.rate(id, data);
      expect(spy).toBeCalled();
      expect(result).toEqual(movieObj);
    });
  });

  describe('suggestions', () => {
    it('should return all non rated movies', async () => {
      const spy = jest.spyOn(repository, 'getNonRatedMovies');
      const result = await service.suggestions();
      expect(spy).toBeCalled();
      expect(result).toEqual([movieObj]);
    });
  });
});
