import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movie } from '../entities/movie.entity';
import { MovieRepository } from './movie.repository';
import { CreateMovieDto } from '../dto/create-movie.dto';

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
    expect(spy).toBeCalledTimes(1);
  });

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
    expect(spy).toBeCalledTimes(1);
    expect(created).toBe(data);
  });
});
