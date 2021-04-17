import {
  AppBar, Button, CircularProgress, Container, CssBaseline, Grid,
  TextField, Toolbar, Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MovieIcon from '@material-ui/icons/Movie';
import { ChangeEvent, useEffect, useState } from 'react';
import MovieDetailView from './components/MovieDetailView';
import MovieGrid from './components/MovieGrid';
import useDebounce from './hooks/useDebounce';
import { MovieListItem, MovieSearchResult } from './models/movie';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  moreButton: {
    textAlign: 'center',
    padding: 12,
  },
}));

const movieApiPageSize = 10;

const hasMorePages = (count: number, totalCount: number, page = 1, pageSize = movieApiPageSize) => {
  return count === pageSize && totalCount > page * pageSize;
}

async function searchMovies(query: string, page = 1) {
  const response = await fetch(`/api/movies?s=${query}&page=${page}`)
  return response.json() as Promise<MovieSearchResult>
}

export default function App() {
  const classes = useStyles();

  const [query, setQuery] = useState('');
  const [movie, setMovie] = useState<MovieListItem>();
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState<MovieListItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    setPage(1)
  }

  const debouncedQuery = useDebounce(query, 500);

  useEffect(
    () => {
      if (debouncedQuery.length > 1) {
        setIsSearching(true);
        setMovie(undefined);
        searchMovies(debouncedQuery).then(({ items, totalCount }) => {
          setHasMore(hasMorePages(items.length, totalCount))
          setMovies(items);
          setIsSearching(false);
        });
      } else {
        setMovies([]);
        setIsSearching(false);
      }
    },
    [debouncedQuery] // Only call effect if debounced search term changes
  );

  useEffect(
    () => {
      if (page > 1) {
        searchMovies(debouncedQuery, page).then(({ items, totalCount }) => {
          setHasMore(hasMorePages(items.length, totalCount, page))
          setMovies(movies => movies.concat(items));
        });
      }
    },
    [debouncedQuery, page]
  );

  return (
    <>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <MovieIcon className={classes.icon} />
          <Typography variant="h6" color="inherit" noWrap>
            Movie search
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="md">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Movie search
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Search movies from OMDb and view NY Times reviews.
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">                
                <Grid item>
                  <TextField
                    onChange={handleQueryChange}
                    placeholder="Movie title"
                  />
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {isSearching && <CircularProgress />}
          {movie === undefined && debouncedQuery.length > 0 && !isSearching && (
            <>
              <MovieGrid movies={movies} onMovieDetailsClick={setMovie} />
              {hasMore && (
                <div className={classes.moreButton}>
                  <Button
                    disabled={isSearching}
                    variant="contained"
                    color="primary"
                    onClick={() => setPage(page => page + 1)}
                  >
                    More
                  </Button>
                </div>
              )}
            </>
          )}
          {movie !== undefined && (
            <MovieDetailView 
              movie={movie}
              onClickBack={() => setMovie(undefined)} 
            />
          )}
        </Container>
      </main>
    </>
  );
}
