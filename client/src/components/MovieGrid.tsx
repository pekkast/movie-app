import { Grid, Typography } from '@material-ui/core';
import { MovieListItem } from '../models/movie';
import MovieCard from './MovieCard';

export type MovieGridProps = {
  movies: MovieListItem[];
  onMovieDetailsClick: (movie: MovieListItem) => void;
}

export default function MovieGrid(props: MovieGridProps) {
  if (props.movies.length === 0) {
    return (
      <Typography variant="subtitle1" color="textSecondary">
        Nothing found
      </Typography>
    )
  }

  return (
    <Grid container spacing={4}>
      {props.movies.map((movie) => (
        <Grid item key={movie.imdbID} xs={12} sm={6} md={4}>
          <MovieCard 
            movie={movie} 
            onDetailsClick={() => props.onMovieDetailsClick(movie)} 
          />
        </Grid>
      ))}
    </Grid>
  )
}