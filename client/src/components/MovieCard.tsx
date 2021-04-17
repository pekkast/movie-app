import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import { MovieListItem } from '../models/movie';

const useStyles = makeStyles({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardContent: {
    flexGrow: 1,
  },
});

export type MovieCardProps = {
  movie: MovieListItem;
  onDetailsClick: () => void;
}

export default function MovieCard({ movie, onDetailsClick }: MovieCardProps) {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      {movie.Poster.length > 3 && (
        <CardMedia
          component="img"
          image={movie.Poster}
          title={movie.Title}
        />
      )}
      <CardContent className={classes.cardContent}>
        <Typography gutterBottom variant="h5" component="h2">
          {movie.Title}
        </Typography>
        <Typography>
          {movie.Year}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={onDetailsClick}>
          Details &amp; Reviews
        </Button>
      </CardActions>
    </Card>
  );
}