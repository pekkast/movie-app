export type MovieReview = {
  display_title: string;
  critics_pick: 0 | 1;
  byline: string;
  headline: string;
  summary_short: string;
  publication_date: string;
  opening_date: string;
  date_updated: string;
  link: {
    type: 'article';
    url: string;
    suggested_link_text: string;
  }
}

export type ReviewResponse = {
  status: 'OK';
  copyright: string;
  has_more: boolean;
  num_results: number;
  results: MovieReview[] | null;
}
