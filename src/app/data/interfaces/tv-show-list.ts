export interface TVShowList {
  page: number
  results: TVShowResult[]
  total_pages: number
  total_results: number
}

export interface TrendingTVShowResult {
  backdrop_path: string
  id: number
  name: string
  original_name: string
  overview: string
  poster_path: string
  media_type: string
  adult: boolean
  original_language: string
  genre_ids: number[]
  popularity: number
  first_air_date: string
  vote_average: number
  vote_count: number
  origin_country: string[]
}

export interface TVShowResult
  extends Omit<TrendingTVShowResult, 'media_type'> {}
