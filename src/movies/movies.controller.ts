import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { RateMovieDto } from './dto/rate-movie.dto';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('movies')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @ApiOperation({ summary: 'Creates a new movie instance in the database' })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
  })
  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.create(createMovieDto);
  }

  @ApiOperation({ summary: 'Gets all movies in the database' })
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @Get()
  findAll() {
    return this.moviesService.findAll();
  }

  @ApiOperation({ summary: 'Gets all non rated movies in the database' })
  @ApiResponse({ status: HttpStatus.OK })
  @Get('suggestions')
  suggestions() {
    return this.moviesService.suggestions();
  }

  @ApiOperation({ summary: 'Returns a instance of movie with the id given' })
  @ApiResponse({ status: HttpStatus.OK })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moviesService.findOne(id);
  }

  @ApiOperation({
    summary: 'Updates a movie instance with the id given and body',
  })
  @ApiResponse({ status: HttpStatus.OK })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.moviesService.update(id, updateMovieDto);
  }

  @ApiOperation({ summary: 'Rates a movie with the given id' })
  @ApiResponse({ status: HttpStatus.OK })
  @Patch('rate/:id')
  rate(@Param('id') id: string, @Body() data: RateMovieDto) {
    return this.moviesService.rate(id, data);
  }

  @ApiOperation({ summary: 'Deletes a movie with the given id' })
  @ApiResponse({ status: HttpStatus.OK })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moviesService.remove(id);
  }
}
