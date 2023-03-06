import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMovieDto {
  @ApiProperty({
    description: 'Movie title',
    example: 'Once Upon a Time in Hollywood',
  })
  @IsString({
    message: 'title should be a string',
  })
  @IsNotEmpty({
    message: 'title should be provided',
  })
  title: string;

  @ApiProperty({
    description: 'Movie description',
    example: 'Quentin Tarantino marterpiece',
  })
  @IsString({
    message: 'description should be a string',
  })
  @IsNotEmpty({
    message: 'description should be provided',
  })
  description: string;

  @ApiProperty({
    description: 'Movie duration',
    example: '2h41',
  })
  @IsString({
    message: 'duration should be a string',
  })
  @IsNotEmpty({
    message: 'duration should be provided',
  })
  duration: string;
}
