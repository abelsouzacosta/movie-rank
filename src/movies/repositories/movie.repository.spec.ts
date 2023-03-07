import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movie } from '../entities/movie.entity';
import { MovieRepository } from './movie.repository';
import { CreateMovieDto } from '../dto/create-movie.dto';
import { UpdateMovieDto } from '../dto/update-movie.dto';

describe('MovieRepository', () => {
  let mockMovieModel: Model<Movie>;
  let mockRepository: MovieRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getModelToken(Movie.name),
          useValue: Model,
        },
        MovieRepository,
      ],
    }).compile();

    mockMovieModel = module.get<Model<Movie>>(getModelToken(Movie.name));
    mockRepository = module.get<MovieRepository>(MovieRepository);
  });

  it('should be defined', () => {
    expect(mockRepository).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a instance of a movie', async () => {
      const movie = {
        id: '123',
        title: 'The Whale',
        description: 'Darren Aronofsky new movie',
        duration: '1h57',
      };
      const spy = jest
        .spyOn(mockMovieModel, 'findById')
        .mockResolvedValueOnce(movie);
      const result = await mockRepository.findOne('123');
      expect(result).toBe(movie);
      expect(spy).toBeCalled();
    });
  });

  describe('find', () => {
    it('should return all instance of movies in the database', async () => {
      const movies = [
        {
          id: '123',
          title: 'The Whale',
          description: 'Darren Aronofsky new movie',
          duration: '1h57',
        },
      ];
      const spy = jest.spyOn(mockMovieModel, 'find').mockResolvedValue(movies);
      const result = await mockRepository.find();
      expect(spy).toBeCalled();
      expect(result).toBe(movies);
    });
  });

  describe('create', () => {
    it('should create a instance of a movie', async () => {
      const data: CreateMovieDto = {
        title: 'The Whale',
        description: 'Darren Aronofsky new movie',
        duration: '1h57',
      };
      const spy = jest
        .spyOn(mockMovieModel, 'create')
        .mockImplementationOnce(() => Promise.resolve(data));
      const created = await mockRepository.create(data);
      expect(spy).toBeCalled();
      expect(created).toBe(data);
    });
  });

  describe('update', () => {
    it('should update a instance of a movie', async () => {
      const data: UpdateMovieDto = {
        duration: '1h56',
      };
      const spy = jest
        .spyOn(mockMovieModel, 'updateOne')
        .mockResolvedValueOnce(true as any);
      const updated = await mockRepository.update('123', data);
      expect(spy).toBeCalled();
      expect(updated).toBe(true);
    });
  });

  describe('delete', () => {
    it('should delete a instance with the id given', async () => {
      const id = '123';
      const spy = jest
        .spyOn(mockMovieModel, 'deleteOne')
        .mockResolvedValue(true as any);
      const deleted = await mockRepository.delete(id);
      expect(spy).toBeCalled();
      expect(deleted).toBe(true);
    });
  });

  describe('getNonRatedMovies', () => {
    it('should return a list of rated movies', async () => {
      const movies = [
        {
          id: '123',
          title: 'The Whale',
          description: 'Darren Aronofsky new movie',
          duration: '1h57',
          rate: 0,
        },
      ];
      const spy = jest.spyOn(mockMovieModel, 'find').mockResolvedValue(movies);
      const result = await mockRepository.getNonRatedMovies();
      expect(spy).toBeCalled();
      expect(result).toBe(movies);
    });
  });

  describe('rateMovie', () => {
    it('should update the movie note', async () => {
      const id = '123';
      const dto = {
        note: 10,
      };
      const spy = jest
        .spyOn(mockMovieModel, 'updateOne')
        .mockResolvedValueOnce(true as any);
      const result = await mockRepository.rate(id, dto);
      expect(spy).toBeCalled();
      expect(result).toBe(true);
    });
  });
});
