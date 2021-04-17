import { Card, CardActions, CardContent, Link, makeStyles, Typography } from '@material-ui/core';
import { MovieReview } from '../models/review';

const useStyles = makeStyles({
  root: {
    marginBottom: 10,
  }
})

export type ReviewCardProps = {
  review: MovieReview;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const classes = useStyles();
  
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {review.byline}
        </Typography>
        <Typography variant="h5" component="h2">
          {review.headline}
        </Typography>
        <Typography color="textSecondary">
          {review.display_title}
        </Typography>
        <Typography variant="body2" component="p">
          {review.summary_short}
          <br />
          {review.publication_date}
        </Typography>
      </CardContent>
      <CardActions>
        <Link href={review.link.url}>
          {review.link.suggested_link_text}
        </Link>
      </CardActions>
    </Card>
  );
}