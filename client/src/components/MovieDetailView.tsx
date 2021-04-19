import { Box, CircularProgress, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { MovieDetails, MovieListItem } from '../models/movie';
import { MovieReview, ReviewResponse } from '../models/review';
import { fetchApi } from '../utils/fetchApi';
import MovieDetailsCard from './MovieDetailCard';
import ReviewCard from './ReviewCard';

export type MovieDetailsProps = {
  movie: MovieListItem;
  onClickBack: () => void;
}

async function fetchDetails(id: string) {
  const response = await fetchApi(`/movies/${id}`);
  return await response.json() as MovieDetails;
}

async function fetchReviews(title: string) {
  const response = await fetchApi(`/reviews?title=${title}`);
  const data = await response.json() as ReviewResponse;
  return data.results || [];
}

export default function MovieDetailView({ movie, onClickBack }: MovieDetailsProps) {
  const [isFetching, setIsFetching] = useState(false)
  const [details, setDetails] = useState(movie as MovieDetails)
  const [reviews, setReviews] = useState<MovieReview[]>([])

  useEffect(() => {
    fetchDetails(movie.imdbID).then(setDetails);
  }, [movie.imdbID]);

  useEffect(() => {
    setIsFetching(true);
    fetchReviews(movie.Title).then((reviews) => {
      setReviews(reviews);
      setIsFetching(false);
    });
  }, [movie.Title]);

  return (
    <>
      <MovieDetailsCard movie={details} onClickBack={onClickBack} />
      <Box paddingTop={2}>
        <Typography component="h3" variant="h5">Reviews</Typography>
        {isFetching && <CircularProgress />}
        {reviews.map(review => <ReviewCard key={review.byline} review={review} />)}
      </Box>
    </>
  )
}