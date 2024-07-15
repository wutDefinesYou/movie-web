export interface MovieReleaseDateList {
  id: number
  results: MovieReleaseDateResult[]
}

export interface MovieReleaseDateResult {
  iso_3166_1: string
  release_dates: ReleaseDate[]
}

export interface ReleaseDate {
  certification: string
  descriptors: string[]
  iso_639_1: string
  note: string
  release_date: string
  type: number
}
