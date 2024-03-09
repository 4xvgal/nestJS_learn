import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entities';


@Injectable()
export class MoviesService {
    private movies : Movie[] = [];

    getAll(): Movie[]{
        return this.movies;
    }
    getOne(id:number): Movie{
        console.log(typeof(id));
        const movie = this.movies.find(movie => movie.id === id);
        if(!movie){
            throw new NotFoundException(`Movie with ID ${id} not found`);
        }
        else return movie;
    }

    deleteOne(id:number){
        this.getOne(id);
        this.movies = this.movies.filter(movie => movie.id !== id);
        return true;
    }

    //create
    create(movieData){
        this.movies.push({
            id: this.movies.length + 1,
            ...movieData,
        });

        return this.movies;
    }

    //update
    update(id:number, updateData:UpdateMovieDto){
        const movie =this.getOne(id);
        this.deleteOne(id);
        this.movies.push({...movie, ...updateData});
    }
}

