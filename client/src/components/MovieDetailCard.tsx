import { Button, Card, CardActions, CardContent, CardMedia, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { MovieDetails } from '../models/movie';

const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 512,
  },
});


export type MovieCardProps = {
  movie: MovieDetails;
  onClickBack: () => void;
}

const interestingFields: Array<keyof MovieDetails> = ['Released', 'Runtime', 'Actors', 'Awards', 'imdbVotes', 'BoxOffice', 'Production']

export default function MovieDetailsCard({ movie, onClickBack }: MovieCardProps) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h2" variant="h5">
            {movie.Title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Directed by: {movie.Director}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Written by: {movie.Writer}
          </Typography>
          <p>{movie.Plot}</p>
          {movie.Plot && (
            <List>
              {interestingFields.map(key => (
                <ListItem key={key} dense>
                  <ListItemText primary={`${key}: ${movie[key]}`} />
                </ListItem>
              ))}
            </List>
          )}
        </CardContent>
        <CardActions>
          <Button onClick={onClickBack}>Back</Button>
        </CardActions>
      </div>
      <CardMedia
        component="img"
        className={classes.cover}
        image={movie.Poster}
        title={movie.Title}
      />
    </Card>
  );
}
