import { MovieSearchResult, OMDBbMovieSearchResult } from '../models/movie';

export const apiResultToList = ({
  Search,
  totalResults,
}: OMDBbMovieSearchResult): MovieSearchResult => ({
  items: Search,
  totalCount: +totalResults,
});
