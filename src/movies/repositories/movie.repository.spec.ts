import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movie } from '../entities/movie.entity';
import { MovieRepository } from './movie.repository';

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

  it('should return a instance of a movie', async () => {
    const movie = new Movie();
    const spy = jest.spyOn(mockMovieModel, 'findById').mockResolvedValue(movie);
    await mockRepository.findOne('123');
    expect(spy).toBeCalledTimes(1);
  });
});
