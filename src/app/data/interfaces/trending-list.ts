import { TrendingMovieResult } from './movie-list'
import { TrendingTVShowResult } from './tv-show-list'

export interface TrendingList {
  page: number
  results: (TrendingMovieResult | TrendingTVShowResult)[]
  total_pages: number
  total_results: number
}
