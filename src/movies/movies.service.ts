import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { RateMovieDto } from './dto/rate-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MovieRepository } from './repositories/movie.repository';

@Injectable()
export class MoviesService {
  constructor(private readonly repository: MovieRepository) {}

  async create(data: CreateMovieDto) {
    return this.repository.create(data);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: string) {
    return this.repository.findOne(id);
  }

  update(id: string, data: UpdateMovieDto) {
    return this.repository.update(id, data);
  }

  remove(id: string) {
    return this.repository.delete(id);
  }

  rate(id: string, data: RateMovieDto) {
    return this.repository.rate(id, data);
  }

  suggestions() {
    return this.repository.getNonRatedMovies();
  }
}
