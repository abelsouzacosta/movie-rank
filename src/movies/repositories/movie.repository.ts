import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movie } from '../entities/movie.entity';

export class MovieRepository {
  constructor(
    @InjectModel(Movie.name)
    private readonly model: Model<Movie>,
  ) {}

  async findOne(id: string): Promise<Movie> {
    return this.model.findById(id);
  }
}
