import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMovieDto } from '../dto/create-movie.dto';
import { UpdateMovieDto } from '../dto/update-movie.dto';
import { Movie } from '../entities/movie.entity';

export class MovieRepository {
  constructor(
    @InjectModel(Movie.name)
    private readonly model: Model<Movie>,
  ) {}

  async findOne(id: string): Promise<Movie> {
    return this.model.findById(id);
  }

  async find(): Promise<Array<Movie>> {
    return this.model.find();
  }

  async create(data: CreateMovieDto) {
    return this.model.create({
      ...data,
    });
  }

  async update(id: string, data: UpdateMovieDto) {
    return this.model.updateOne(
      {
        _id: id,
      },
      {
        ...data,
      },
    );
  }
}
