import { IsNotEmpty, IsNumber } from 'class-validator';

export class RateMovieDto {
  @IsNumber()
  @IsNotEmpty({
    message: 'note should be provided',
  })
  note: number;
}
