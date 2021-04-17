export type MovieListItem = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: "movie";
  Poster: string;
};

export type OMDBbMovieSearchResult = {
  Search: MovieListItem[];
  totalResults: string;
  Response: string;
};

export type MovieSearchResult = {
  items: MovieListItem[];
  totalCount: number;
};

export type MovieRating = {
  Source: string;
  Value: string;
};

export type MovieDetails = MovieListItem & {
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Ratings: MovieRating[];
  imdbVotes: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
};
