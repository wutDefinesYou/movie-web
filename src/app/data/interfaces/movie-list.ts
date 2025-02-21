export interface MovieList {
  dates: {
    maximum: string
    minimum: string
  }
  page: number
  results: MovieResult[]
  total_pages: number
  total_results: number
}

export interface MovieListWithoutDates extends Omit<MovieList, 'dates'> {}

export interface TrendingMovieResult {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  media_type: 'movie' | 'tv'
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export interface MovieResult extends Omit<TrendingMovieResult, 'media_type'> {}
