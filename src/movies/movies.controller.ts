import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entities';
import { MoviesService } from './movies.service';

@Controller('movies') // '/movies' is the route
export class MoviesController {
    constructor(private readonly moviesService:MoviesService){}

    @Get()
    getAll() : Movie[]{
        return this.moviesService.getAll();
    }

    @Get('/:id')
    getOne(@Param('id') movieId: number):Movie{
        return this.moviesService.getOne(movieId);
    }
    

    @Post()
    create(@Body() movieData:CreateMovieDto){
        //console.log(movieData)
        //return 'This will create a movie';
        return this.moviesService.create(movieData);
    }
    @Delete("/:id")
    remove(@Param('id') movieId: number){
        return this.moviesService.deleteOne(movieId);
    }

    @Patch('/:id')
    patch(@Param('id') movieId: number, @Body() updateData:UpdateMovieDto){
        return this.moviesService.update(movieId, updateData);
    }    
}
