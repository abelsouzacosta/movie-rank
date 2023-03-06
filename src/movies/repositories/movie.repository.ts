import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMovieDto } from '../dto/create-movie.dto';
import { Movie } from '../entities/movie.entity';

export class MovieRepository {
  constructor(
    @InjectModel(Movie.name)
    private readonly model: Model<Movie>,
  ) {}

  async findOne(id: string): Promise<Movie> {
    return this.model.findById(id);
  }

  async create(data: CreateMovieDto) {
    return this.model.create({
      ...data,
    });
  }
}
